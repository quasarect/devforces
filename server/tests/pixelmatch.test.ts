import { expect, test } from "vitest";

import { getPercentageMatch } from "../api/services/pixelmatch";
import path from "path";
import fs from "fs";

const matcher = (image1: string, image2: string) => {
	return getPercentageMatch(
		fs.readFileSync(path.resolve(__dirname, "resources/images/" + image1)),
		path.resolve(__dirname, "resources/images/" + image2),
	);
};

//image 1

test("pixelmatch 0", () => {
	expect(matcher("user_response_1_image_1.png", "generated_image_1.png")).toBe(
		"95.8",
	);
});

test("pixelmatch 1", () => {
	expect(matcher("user_response_2_image_1.png", "generated_image_1.png")).toBe(
		"97.6",
	);
});

test("pixelmatch 2", () => {
	expect(matcher("user_response_3_image_1.png", "generated_image_1.png")).toBe(
		"94.1",
	);
});

//image 2

test("pixelmatch 3", () => {
	expect(matcher("user_response_1_image_2.png", "generated_image_2.png")).toBe(
		"83.2",
	);
});

test("pixelmatch 4", () => {
	expect(matcher("user_response_2_image_2.png", "generated_image_2.png")).toBe(
		"81.7",
	);
});

test("pixelmatch 5", () => {
	expect(matcher("user_response_3_image_2.png", "generated_image_2.png")).toBe(
		"89.1",
	);
});

//image 3

test("pixelmatch 6", () => {
	expect(matcher("user_response_1_image_3.png", "generated_image_3.png")).toBe(
		"93.7",
	);
});

test("pixelmatch 7", () => {
	expect(matcher("user_response_2_image_3.png", "generated_image_3.png")).toBe(
		"70.8",
	);
});

test("pixelmatch 8", () => {
	expect(matcher("user_response_3_image_3.png", "generated_image_3.png")).toBe(
		"79.7",
	);
});
