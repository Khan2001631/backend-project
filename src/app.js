import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '16kb'}));  // Middleware to parse json data (limit is 16kb)
app.use(express.urlencoded({extended, limit: '16kb'})); // Middleware to parse url encoded data
app.use(express.static('public'));   // Middleware to serve static files in public folder such as favicons, pdf, images etc
app.use(cookieParser());

// What is middleware
// A middleware is a function that has access to the request object (req), the response object (res), 
// and the next() function in the application's request-response cycle.

// What is the use of middleware ?
// Middleware is used to perform tasks such as logging, authentication, and authorization.
// For example: When the request is sent from the browser, before processing the request it checks if the user is authenticated or not.
// There can be multiple checks in middleware.


// A side note:
// When a request is sent from the browser, it contains 4 fields: 
// 1) err  2) req 3) res 4) next


export {app}