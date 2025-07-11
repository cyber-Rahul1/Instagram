import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
    cloud_name: "dv1sih7vk",
    api_key: "144723284849423",
    api_secret: "15tiDBiXn4yJflARZQBLxeuFEEo"
});




const uploadOnCloudinary = async (file) => {
    if (!file) return null;

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
            return uploadResult.secure_url;
        }
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};




export default uploadOnCloudinary;