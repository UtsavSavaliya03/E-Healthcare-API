const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

async function Cloudinary(file) {
    if (!file) {
        return null;
    }
    return await cloudinary.uploader.upload(file?.tempFilePath, (error, result) => {
        if (error) {
            console.log('Error while uploading image in cloud: ', error);
        }
    })
};

module.exports = Cloudinary;