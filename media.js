import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 14601;

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const MEDIA_FILE_BASE_URL = (req) => { return `https://m-fbe-cdn.octopus-tech.com/uploads/${req.file.filename}`; };


app.use(cors());


// Slugify function to create a slug from the filename
const slugify = (text) => {
    return text.replace(/[^a-z0-9]+/gi, '-') // Replace non-alphanumeric characters with hyphens
               .toLowerCase() // Convert to lowercase
               .slice(0, 20); // Truncate to a maximum of 20 characters
};

// Sanitize function to remove harmful characters
const sanitizeFilename = (filename) => {
    return filename.replace(/[^a-zA-Z0-9._-]/g, ''); // Allow only alphanumeric, dots, underscores, and hyphens
};


// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const sanitizedOriginalName = sanitizeFilename(file.originalname); // Sanitize original filename
        const slug = slugify(path.parse(sanitizedOriginalName).name); // Create slug from sanitized filename
        const extension = path.extname(sanitizedOriginalName); // Get the file extension
        const uniqueFilename = `${timestamp}-${slug}${extension}`; // Construct the unique filename
        cb(null, uniqueFilename); // Unique filename
    },
});

const upload = multer({ storage: storage });

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

// Image upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded.' });
    }

    // Respond with the URL of the uploaded image
    const imageUrl = MEDIA_FILE_BASE_URL(req);
    res.status(200).send({ imageUrl: imageUrl });
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDir));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});