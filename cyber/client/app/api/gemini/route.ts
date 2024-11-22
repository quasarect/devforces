import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse, NextRequest } from "next/server";

const GEMINI_API_KEY = "AIzaSyAkjog_7gOg495qm9c1TSBoa_QqxPc9J90";

// Define the POST function with typed parameters
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("Received data:", data); // Log the incoming data

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = data.body;
        console.log("Prompt:", prompt); // Log the prompt being sent

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const output = await response.text();

        return NextResponse.json({ output });
    } catch (error) {
        console.error("Error in API route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
