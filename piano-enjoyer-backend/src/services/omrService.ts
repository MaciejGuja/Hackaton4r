import fs from 'node:fs/promises';
import { GoogleGenerativeAI } from "@google/generative-ai";
import type {Note} from "../types/index.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export class OMRService {
    private model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    async convertPdfToNotes(pdfPath: string): Promise<Note[]> {
        try {
            console.log(`[OMR] Reading PDF file: ${pdfPath}`);

            const pdfBuffer = await fs.readFile(pdfPath);
            const base64Pdf = pdfBuffer.toString("base64");

            const prompt = `
                Analyze this sheet music PDF. Convert the musical notes into a chronological sequence.
                Return ONLY a JSON array of objects: 
                [{"pitch": "C4", "timestamp": 1000, "duration": 500}, {"pitch": "E4", "timestamp": 1500, "duration": 500}]
                
                Rules:
                1. Pitch: Use scientific pitch notation (e.g., C4, F#3).
                2. Timestamp: Start from 0, increments in milliseconds based on the tempo (assume 120 BPM if not specified).
                3. Duration: Length of the note in milliseconds.
                4. Output: Valid JSON only.
            `;

            const result = await this.model.generateContent([
                {
                    inlineData: {
                        data: base64Pdf,
                        mimeType: "application/pdf"
                    }
                },
                prompt
            ]);

            const responseText = result.response.text();
            const cleanJson = responseText.replace(/```json|```/g, "").trim();

            const notes: Note[] = JSON.parse(cleanJson);
            console.log(`[OMR] Extracted ${notes.length} notes using Native PDF Vision.`);
            return notes;
        } catch (error) {
            console.error("[OMR] Gemini PDF Error:", error);
            return [];
        }
    }
}

export const omrService = new OMRService();