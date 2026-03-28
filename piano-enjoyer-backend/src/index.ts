import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sessionRouter } from "./routes/index.js";
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

app.use("/api/v1", sessionRouter);

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});