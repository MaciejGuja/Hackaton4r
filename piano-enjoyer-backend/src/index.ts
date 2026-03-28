import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from "./routes/index.js"; // Importujemy główny router
import path from "node:path";
import { fileURLToPath } from 'node:url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/v1", router);

app.listen(port, () => {
    console.log(`🎹 Piano Enjoyer Backend running at http://localhost:${port}`);
});