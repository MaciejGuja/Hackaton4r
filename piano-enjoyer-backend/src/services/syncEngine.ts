import type {Note, SyncConfig} from "../types/index.js";
import { smelterService } from "./smelterService.js";

export class SyncEngine {
    private isRunning: boolean = false;
    private startTime: number = 0;
    private currentIndex: number = 0;
    private notes: Note[] = [];
    private config: SyncConfig | null = null;
    private timerId: NodeJS.Timeout | null = null;

    public start(notes: Note[], config: SyncConfig) {
        this.notes = notes.sort((a, b) => a.timestamp - b.timestamp);
        this.config = config;
        this.currentIndex = 0;
        this.isRunning = true;
        this.startTime = Date.now();

        console.log(`Started for room: ${config.roomId}`);

        this.timerId = setInterval(() => this.tick(), 10);
    }

    private tick() {
        if (!this.isRunning || !this.config) return;

        const elapsedTime = Date.now() - this.startTime;

        while (this.currentIndex < this.notes.length) {
            const note = this.notes[this.currentIndex];
            if (note && note.timestamp <= elapsedTime + this.config.userDelay) {
                this.triggerNoteOverlay(note);
                this.currentIndex++;
            } else {
                break;
            }
        }

        if (this.currentIndex >= this.notes.length) {
            this.stop();
        }
    }

    private async triggerNoteOverlay(note: Note) {
        if (!this.config) return;

        console.log(`Triggering note: ${note.pitch} at ${note.timestamp}ms`);

        await smelterService.drawNoteHighlight(
            this.config.roomId,
            note.pitch,
            note.duration
        );
    }

    public stop() {
        this.isRunning = false;
        if (this.timerId) clearInterval(this.timerId);
        console.log("Stopped.");
    }
}

export const syncEngine = new SyncEngine();