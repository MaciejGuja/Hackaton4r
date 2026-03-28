import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (_req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

app.get('/health', (_req: Request, res: Response) => {
    res.send({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/upload-sheet', upload.single('sheet'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }

    res.send({
        message: 'Sheet music uploaded successfully',
        fileId: req.file.filename
    });
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});