import axios from 'axios';
import type { KeyMap } from "./geminiService.js";

export class SmelterService {
    private readonly baseUrl = "http://smelter:8090";
    private currentKeyMap: KeyMap[] = [];

    async registerInput(roomId: string) {
        try {
            await axios.post(`${this.baseUrl}/inputs/${roomId}/register`, {
                type: "rtp",
                port: 5000
            });
            console.log(`[Smelter] Input registered for room ${roomId}`);
        } catch (error) {
            console.error("[Smelter] Failed to register input:", error);
        }
    }

    updateKeyMap(newMap: KeyMap[]) {
        this.currentKeyMap = newMap;
        console.log(`[Smelter] KeyMap updated with ${newMap.length} keys.`);
    }

    async drawNoteHighlight(roomId: string, pitch: string, duration: number) {
        const keyData = this.currentKeyMap.find(k => k.pitch === pitch);

        if (!keyData) {
            return;
        }

        const layerId = `note_${pitch}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        try {
            await axios.post(`${this.baseUrl}/scenes/${roomId}/layers`, {
                id: layerId,
                type: "rect",
                position: {
                    x: keyData.x_percent,
                    y: keyData.y_percent,
                    width: keyData.width_percent,
                    height: 0.1
                },
                style: {
                    fill_color: "#00FF00AA",
                }
            });

            setTimeout(async () => {
                try {
                    await axios.delete(`${this.baseUrl}/scenes/${roomId}/layers/${layerId}`);
                } catch (e) {
                }
            }, duration);

        } catch (error) {
            console.error(`[Smelter] Draw error for ${pitch}:`, error);
        }
    }
}

export const smelterService = new SmelterService();