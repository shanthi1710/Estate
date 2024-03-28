import express from "express";
import connectDB from "./db/index.js"
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import path from 'path';

const app =express();
app.use(express.json());
app.use(cookieParser());

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
//import { verifyToken } from "./utils/verifyUser.js";

dotenv.config();
 
const port=process.env.PORT || 8000
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running at port ${port}`)
    })
})
.catch((err)=>{
    console.log("MONGO DB connection failed !!",err);
})

const __dirname = path.resolve();

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client','dist','index.html'));
})
//error respons 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
 
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
