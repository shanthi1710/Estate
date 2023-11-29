import express from "express";
import connectDB from "./db/index.js"
import dotenv from 'dotenv';

const app =express();
app.use(express.json());
//import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js';

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

//app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

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
