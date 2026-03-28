import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const analyzeKeyboardLayout = async (imageBuffer: Buffer) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Identify the piano keyboard in this image and return the bounding box of each key in JSON format.";

    const result = await model.generateContent([prompt, { inlineData: { data: imageBuffer.toString("base64"), mimeType: "image/jpeg" } }]);
    return result.response.text();
};