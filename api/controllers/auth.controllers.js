import User from '../models/user.models.js';
import bcryptjs  from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next) =>{
    const  {username,email,password} = req.body;
    const hashedPassword =  bcryptjs.hashSync(password,10);
    const newUser  = new User({username,email,password: hashedPassword});
    try{
        await newUser.save();
        res.status(201).json('User Created Successfully');
    }catch(error){
        next(error);
    }
}

export const signin = async (req,res,next) =>{
    const {email,password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404, 'User Not Found'));
        const isValidPassword = bcryptjs.compareSync(password,validUser.password);
        if(!isValidPassword) return next(errorHandler(401, 'Invalid Password'));
        const token = jwt.sign({id:validUser._id},process.env.JWT)
        const {password: pass,...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly: true})
        res.status(200).json(rest);
    }

    catch (error){
        
    }
}