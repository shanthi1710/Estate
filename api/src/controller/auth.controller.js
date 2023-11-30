import User from '../models/user.model.js';
import {errorHandler} from '../utils/error.js'
import bcryptjs from 'bcryptjs';
import  Jwt  from 'jsonwebtoken';

export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

     try{
        await newUser.save();
        res.status(201).json('User created successfully');
     }catch(error)
     {
        next(error);
     }
};


export const signin =async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, 'User not found!'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(401, 'Invalid password!'));
        }
        const token=Jwt.sign({id:validUser._id},process.env.JWT_SECRET) //create JWT token

        const {password: pass,...rest}=validUser._doc; // hiding the password
        res
            .cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest);
        
    }catch{
        next(error);
    }
}