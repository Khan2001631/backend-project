// require('dotenv').config({path: './env'})
import dontenv  from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';

dontenv.config({path: './.env'})
// You also have to make changes in script in package.json:
// "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"




connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at PORT:  ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection Failed!!!! ", error);
}) 
















// Points to remeber:
/*
While connecting to the database, problems can occur, so it is best to wrap it in try-catch block or Promises.

Database is always in other continent so it takes time. So apply async await

While using IFFY, it is a professional approach to use semicolon before IFFY code.
*/





// One of the approach to coneect database to mongoose
/*
import express from "express";
const app = express();
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log('Database connected');
        app.on('error', (error) => {
            // Write a suitable error:
            console.error("Problem connecting express app", error);
            throw error;
        })
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        })
        
    }
    catch(error) {
        console.error(error);
        throw error;
    }
})()
*/



