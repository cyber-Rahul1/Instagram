import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


const uploadOnCloudinary = async (filepath) => {
    if (!filepath) return null;

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });

    try {
        const uploadResult = await cloudinary.uploader.upload(filepath);
        console.log('Cloudinary upload result:', uploadResult);
        return uploadResult.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error; 
    } finally {
      
        fs.unlink(filepath, (err) => {
            if (err) console.error('Failed to delete temp file:', err);
        });
    }
        };

       


export default uploadOnCloudinary;