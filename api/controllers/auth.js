import User from "../models/User.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js"


export const login = async(req,res)=>{
    
    try{
        const {userName,password} = req.body

        const user = await User.findOne({userName})

        if(!user){
            return res.status(404).json({error:"User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = generateTokenAndSetCookie(req,res,user._id);

        res.status(200).json({
            message:{
                _id:user._id,
                fullName: user.fullName,
                username: user.username,
                profilePic: user.profilePic,
            }
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error.message,name:error.name,stack:error.stack})
    }
    // res.json("Hello from controller")
}

export const logout = async(req,res)=>{
    try{
        res.cookie("token","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully."})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error.message,name:error.name,stack:error.stack})
    }

}

export const signup = async(req,res)=>{

    try{
        const {fullName,userName,password,confirmPassword,gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords don't match"})
        }

        const user = await User.findOne({userName:userName})

        if(user){
            return res.status(400).json({error:"User already exists"})
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            userName,
            password:hashedPassword,
            gender,
            profilePic : gender === "male" ? `https://avatar.iran.liara.run/public/boy?username=${userName}` 
                                           : `https://avatar.iran.liara.run/public/girl?username=${userName}`
        })

        if(newUser){
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })
        }
        else{
            res.status(400).json({error:"Invalid User Data"})
        }
        
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error.message,name:error.name,stack:error.stack})
    }
}