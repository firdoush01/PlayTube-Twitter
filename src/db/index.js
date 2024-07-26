import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDB Connected!! DB HOST: ${connectionInstance.connection.host}`);
        console.log(`Server is runnig at PORT: ${process.env.PORT}`);
    } catch (error) {
        console.log("MongoDB connection error:", error);
        process.exit(1);
    }
};


export default connectDB;
