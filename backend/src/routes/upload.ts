import "dotenv/config";
import  multer  from 'multer';
import express from "express";

import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure Multer (Store file in memory temporarily)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 3. The Upload Endpoint
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 4. Upload to Cloudinary using a stream
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "travel-app-users", // Optional: Organize in a folder
    });

    // 5. Return the URL to the frontend
    res.json({ url: result.secure_url });
    
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;