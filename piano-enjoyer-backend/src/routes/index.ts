import { Router } from 'express';
import { upload } from "../middleware/upload.js";
import { sessionRouter } from "./session.routes.js";

export const router = Router();

router.post('/upload', upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    res.json({ message: "File uploaded!", fileId: req.file.filename });
});

router.use('/session', sessionRouter);