import { Router } from 'express';
import { syncEngine } from "../services/syncEngine.js";
import { createPianoSession } from "../services/fishjamService.js";
import { smelterService } from "../services/smelterService.js";
import { omrService } from "../services/omrService.js";
import path from "node:path";
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const sessionRouter = Router();

sessionRouter.post('/start-piano', async (req, res) => {
    try {
        const { fileId, userDelay } = req.body;
        const filePath = path.join(__dirname, "../../uploads", fileId);

        const fishjamData = await createPianoSession();
        await smelterService.registerInput(fishjamData.roomId);

        const notes = await omrService.convertPdfToNotes(filePath);

        if (notes.length === 0) {
            return res.status(422).json({ error: "Could not parse notes from PDF" });
        }

        syncEngine.start(notes, {
            roomId: fishjamData.roomId,
            userDelay: userDelay || 500
        });

        res.json({
            ...fishjamData,
            notesCount: notes.length,
            message: "Session initialized and sync started"
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to start full piano session' });
    }
});

sessionRouter.post('/stop', (req, res) => {
    syncEngine.stop();
    res.json({ status: "Playback stopped" });
});