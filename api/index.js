import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import  userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log("Connected to your  database")
}).catch((e) =>{
    console.log("Some error occurred",e);
})

const app = express();
app.use(express.json());

app.listen(3000, () =>{ 
    console.log('Server Running at port 3000');
})

app.use("/api/user", userRoutes);
app.use("/api/auth",  authRoutes);
app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message  || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message: message,
        statusCode: statusCode, 
    });
})