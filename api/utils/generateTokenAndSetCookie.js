import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (req,res,userId)=>{

    const token = jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN})

    res.cookie('authToken',token,{
        httpOnly:true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none', 
    })


}

export default generateTokenAndSetCookie