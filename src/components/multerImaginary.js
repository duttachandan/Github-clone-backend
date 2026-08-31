require('dotenv').config();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
});

const IMAGE_TYPE = ['jpeg', 'jpg', 'avif', 'gif', 'png'];

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "github_clone",
        allowed_formats: IMAGE_TYPE,
        public_id: (req, res) => `${Date.now()}`,
    }
});

const imageUpload = multer({ storage: storage });

module.exports = imageUpload;


