import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const register=async(req,res)=>{
    const {name,email,password,role}=req.body;
    if(!name || !email || !password || !role)
    {
        return res.status(400).json({error:"Please provide all the fields"});
    }
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({error:"User already exists"});
        }
        else
        {
            let newUser= await User.create({
                name,
                email,
                password,
                role
            });
             delete newUser.password;
            res.status(201).json({message:"User created successfully",newUser});
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server error"});
    }
}


const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return res.status(400).json({error:"Please provide all the fields"});
    }
    try{
        let user=await User.findOne({email});
        if(user && (await user.isPasswordCorrect(password)))
        {
            let token=jwt.sign({email:email},process.env.JWT_SECRET);

            res.status(200).json({message:"Login successful",token});
        }
        else
        {
            res.status(400).json({error:"Invalid credentials"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server error"});
    }
}

const logout=async(req,res)=>{
    res.status(200).json({message:"Logout successful"});
}


export {register,login,logout};