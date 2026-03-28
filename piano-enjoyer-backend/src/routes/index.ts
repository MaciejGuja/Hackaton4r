import {Router} from 'express';
import {syncEngine} from "../services/syncEngine.js";
import {createPianoSession} from "../services/fishjamService.js";
import {parseSheetMusic} from "../services/omrService.js";
import {smelterService} from "../services/smelterService.js";

export const sessionRouter = Router();

sessionRouter.post('/start', async (req, res) => {
    try {
        const { pdfPath, userDelay } = req.body;

        const fishjamData = await createPianoSession();
        const notes = await parseSheetMusic(pdfPath);
        await smelterService.registerInput(fishjamData.roomId);

        res.json({
            ...fishjamData,
            notesCount: notes.length,
            status: "ready"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to initialize session" });
    }
});

sessionRouter.post('/play', async (req, res) => {
    const { roomId, notes, userDelay } = req.body;

    syncEngine.start(notes, {
        roomId,
        userDelay: userDelay || 0
    });

    res.json({ status: "Playback started" });
});

sessionRouter.post('/stop', (req, res) => {
    syncEngine.stop();
    res.json({ status: "Playback stopped" });
});