import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// const DB_NAME = process.env.DB_NAME;

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDB Connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error:", error);
        process.exit(1);
    }
};
connectDB();

export default connectDB;
