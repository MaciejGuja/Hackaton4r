import axios from 'axios';
import { KEY_MAP } from '../types/smelter.js';

export class SmelterService {
    private readonly baseUrl = "http://smelter:8090"; // Adres wewnątrz sieci Docker

    /**
     * Rejestruje wejście wideo z Fishjam do Smeltera.
     * Fishjam zazwyczaj wystawia stream RTP lub webrtc.
     */
    async registerInput(roomId: string) {
        try {
            await axios.post(`${this.baseUrl}/inputs/${roomId}/register`, {
                type: "rtp", // lub webrtc w zależności od konfiguracji Fishjam
                port: 5000 // przykładowy port
            });
            console.log(`[Smelter] Input registered for room ${roomId}`);
        } catch (error) {
            console.error("[Smelter] Failed to register input:", error);
        }
    }

    /**
     * Najważniejsza funkcja: Rysuje "podświetlenie" nuty.
     */
    async drawNoteHighlight(roomId: string, pitch: string, duration: number) {
        const coords = KEY_MAP[pitch];
        if (!coords) {
            console.warn(`[Smelter] No coordinates for pitch: ${pitch}`);
            return;
        }

        const layerId = `note_${pitch}_${Date.now()}`;

        try {
            // 1. Dodaj warstwę (prostokąt)
            await axios.post(`${this.baseUrl}/scenes/${roomId}/layers`, {
                id: layerId,
                type: "rect",
                position: {
                    x: coords.x,
                    y: coords.y,
                    width: coords.width,
                    height: coords.height
                },
                color: "#00FF00AA", // Zielony z przezroczystością
            });

            // 2. Usuń warstwę po upływie czasu trwania nuty
            setTimeout(async () => {
                try {
                    await axios.delete(`${this.baseUrl}/scenes/${roomId}/layers/${layerId}`);
                } catch (e) {
                    // Ignorujemy błąd, jeśli sesja już się zamknęła
                }
            }, duration);

        } catch (error) {
            console.error("[Smelter] Draw error:", error);
        }
    }
}

export const smelterService = new SmelterService();