import express from "express";
import connectDB from "./db/index.js"
import dotenv from 'dotenv';

import userRouter from './routes/user.route.js'

dotenv.config();
const app =express();

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

app.use("/api/user",userRouter);