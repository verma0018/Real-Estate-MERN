import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import  userRoutes from './routes/user.routes.js';


dotenv.config();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log("Connected to your  database")
}).catch((e) =>{
    console.log("Some error occurred",e);
})

const app = express();

app.listen(3000, () =>{ 
    console.log('Server Running at port 3000');
})

app.use("/api/user", userRoutes);