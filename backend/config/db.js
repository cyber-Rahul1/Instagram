import mongoose from "mongoose";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connected ...');
        
        // Background worker to keep MongoDB free cluster alive
        setInterval(async () => {
            try {
                if (mongoose.connection.db) {
                    await mongoose.connection.db.admin().ping();
                    console.log('MongoDB keep-alive ping successful');
                }
            } catch (err) {
                console.log('MongoDB keep-alive ping failed:', err);
            }
        }, 14 * 60 * 1000); // Ping every 14 minutes
        
    } catch (error) {
        console.log(`MongoDB connection failed: ${error}`);
    }
}

export default connectDB;