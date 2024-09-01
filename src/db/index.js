import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { app } from './app.js';


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMongoDB connected!!! DB Host: ${connectionInstance.connection.host}`);
        // console.log(connectionInstance);
        app.on('error', (error) => {
            // Write a suitable error:
            console.error("Problem connecting express app", error);
            throw error;
        })
    }
    catch(error) {
        console.log("MongoDB connection FAILED: ", error);
        process.exit(1);
    }
}

export default connectDB;