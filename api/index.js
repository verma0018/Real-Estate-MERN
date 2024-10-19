import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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