const multer = require('multer');
const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
});

const IMAGE_TYPE = ['jpeg', 'jpg', 'avif', 'gif'];

const storage = CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "github_clone",
        allowed_formats: IMAGE_TYPE,
        // format: async (req, file) => 'png',
        public_id: (req, res) => Date.now(),
    }
})

const imageUpload = multer({ storage: storage });

module.exports = imageUpload;


