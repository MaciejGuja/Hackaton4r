import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface KeyMap {
    pitch: string;
    x_percent: number;
    y_percent: number;
    width_percent: number;
}

export class GeminiService {
    private model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    /**
     * Wysyła klatkę wideo do Gemini, aby zlokalizować klawisze.
     * @param imageBuffer Buffer z klatką JPEG/PNG
     */
    async detectKeyboard(imageBuffer: Buffer): Promise<KeyMap[]> {
        const prompt = `
            Analyze this top-down image of a piano keyboard. 
            Identify the precise horizontal position (x) of the keys.
            Return a JSON array of objects: {"pitch": "C4", "x_percent": 0.12, "y_percent": 0.8, "width_percent": 0.02}.
            Only return the JSON, no prose.
        `;

        try {
            const result = await this.model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: imageBuffer.toString("base64"),
                        mimeType: "image/jpeg"
                    }
                }
            ]);

            const responseText = result.response.text();
            const cleanJson = responseText.replace(/```json|```/g, "").trim();

            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("[Gemini] Error detecting keyboard:", error);
            return [];
        }
    }
}

export const geminiService = new GeminiService();