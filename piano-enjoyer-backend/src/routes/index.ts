import { Router } from 'express';
import { upload } from "../middleware/upload.js";
import { createPianoSession } from "../services/fishjamService.js";

export const router = Router();

router.post('/upload', upload.single("file"), (req, res) => {
    res.json({ message: "File uploaded!", file: req.file });
});

router.post('/session', async (req, res) => {
    try {
        const sessionData = await createPianoSession();
        res.json(sessionData);
    } catch (e) {
        res.status(500).json({ error: 'Failed to create session' });
    }
});

export default router;