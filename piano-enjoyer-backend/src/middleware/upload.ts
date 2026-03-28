import multer from "multer";
import path from "node:path";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path.join(__dirname, "../../uploads"));
    },
    filename: function (_req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniquePrefix + "-" + file.originalname);
    }
});

export const upload = multer({ storage: storage });