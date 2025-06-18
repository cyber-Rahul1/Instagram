import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connected ...')
    } catch (error) {
        console.log(`MongoDB connection failed: ${error}`);
    }
}

export default connectDB;