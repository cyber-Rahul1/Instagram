import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { Readable } from 'stream';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});




const uploadOnCloudinary = async (file) => {
    if (!file) return null;

    // try {
    //     const uploadResult = await cloudinary.uploader.upload(filepath);
    //     console.log('Cloudinary upload result:', uploadResult);
    //     return uploadResult.secure_url;
    // } catch (error) {
    //     console.error('Cloudinary upload error:', error);
    //     throw error; 
    // } finally {

    //     fs.unlink(filepath, (err) => {
    //         if (err) console.error('Failed to delete temp file:', err);
    //     });
    // }




    try {
        if (file.buffer) {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: 'auto' },
                    (error, result) => {
                        if (error) {
                            console.error('Cloudinary upload error:', error);
                            reject(error);
                        } else {
                            console.log('Cloudinary upload result:', result);
                            resolve(result.secure_url);
                        }
                    }
                );

                // Convert buffer to stream and pipe to cloudinary
                const stream = Readable.from(file.buffer);
                stream.pipe(uploadStream);
            });
        }
        // For disk storage (file is a path)
        else {
            const uploadResult = await cloudinary.uploader.upload(file);
            console.log('Cloudinary upload result:', uploadResult);
            return uploadResult.secure_url;
        }
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};




export default uploadOnCloudinary;