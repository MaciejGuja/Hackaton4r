import { Router } from 'express';
import { upload } from "../middleware/upload.js";

export const router = Router();

router.post('/upload', upload.single("file"), (req, res) => {
    res.json({ message: "File uploaded!", file: req.file });
});

export default router;