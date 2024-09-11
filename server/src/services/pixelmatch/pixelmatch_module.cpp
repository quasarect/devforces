#include <napi.h>
#include <iostream>
#include <cstdint>
#include <cstring>
#include <string>
#include "mapbox/pixelmatch.hpp"
#define STB_IMAGE_IMPLEMENTATION
#include "mapbox/stb_image.hpp"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "mapbox/stb_image_write.hpp"

bool loadImageFromBuffer(const uint8_t *buffer, std::size_t bufferSize, uint8_t *&img, std::size_t &width, std::size_t &height)
{
    int imgWidth, imgHeight, imgChannels;

    uint8_t *data = stbi_load_from_memory(buffer, bufferSize, &imgWidth, &imgHeight, &imgChannels, 4); // Request 4 channels (RGBA)
    if (data == nullptr)
    {
        std::cerr << "Error loading image from buffer" << std::endl;
        return false;
    }

    width = imgWidth;
    height = imgHeight;
    img = data;
    return true;
}

bool loadImage(const std::string &filename, uint8_t *&img, std::size_t &width, std::size_t &height)
{
    int imgWidth, imgHeight, imgChannels;

    uint8_t *data = stbi_load(filename.c_str(), &imgWidth, &imgHeight, &imgChannels, 4); // Request 4 channels (RGBA)
    if (data == nullptr)
    {
        std::cerr << "Error loading image: " << filename << std::endl;
        return false;
    }

    width = imgWidth;
    height = imgHeight;
    img = data;
    return true;
}

void saveImage(const uint8_t *img, const std::string &filename, std::size_t width, std::size_t height)
{
    stbi_write_png(filename.c_str(), width, height, 4, img, width * 4);
}

Napi::Value CompareImages(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    // Check the number of arguments
    if (info.Length() < 2 || !info[0].IsBuffer() || !info[1].IsString())
    {
        Napi::TypeError::New(env, "Expected an image buffer and a file path as arguments").ThrowAsJavaScriptException();
        return env.Null();
    }

    // Get image buffer and file path
    Napi::Buffer<uint8_t> buffer1 = info[0].As<Napi::Buffer<uint8_t>>();
    std::string image2Path = info[1].As<Napi::String>().Utf8Value();

    uint8_t *img1 = nullptr;
    uint8_t *img2 = nullptr;
    uint8_t *output = nullptr;
    std::size_t widthImage1, heightImage1, widthImage2, heightImage2;

    if (!loadImageFromBuffer(buffer1.Data(), buffer1.Length(), img1, widthImage1, heightImage1) ||
        !loadImage(image2Path, img2, widthImage2, heightImage2))
    {
        Napi::TypeError::New(env, "Error loading images").ThrowAsJavaScriptException();
        return env.Null();
    }

    if (widthImage1 != widthImage2 || heightImage1 != heightImage2)
    {
        Napi::TypeError::New(env, "Image dimensions do not match").ThrowAsJavaScriptException();
        stbi_image_free(img1);
        stbi_image_free(img2);
        return env.Null();
    }

    output = new uint8_t[widthImage1 * heightImage1 * 4];

    double threshold = 0.5;
    bool includeAA = true;

    uint64_t numDiffPixels = mapbox::pixelmatch(img1, img2, widthImage1, heightImage1, output, threshold, includeAA);

    double totalPixels = widthImage1 * heightImage1;
    double percentageDiff = 100 - (static_cast<double>(numDiffPixels) / totalPixels * 100.0);

    // Save the output image
    // saveImage(output, "output_diff.png", widthImage1, heightImage1);

    // Clean up
    stbi_image_free(img1);
    stbi_image_free(img2);
    delete[] output;

    // Create a result object
    Napi::Object result = Napi::Object::New(env);
    result.Set("numDiffPixels", Napi::Number::New(env, numDiffPixels));
    result.Set("percentageDiff", Napi::Number::New(env, percentageDiff));

    return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set("compareImages", Napi::Function::New(env, CompareImages));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)
