import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const auth = async(req,res,next)=>{
    try {
        // Get the token from headers, cookies, or query (based on where you store it)
        const token = req.cookies.authToken;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No Token Provided"' });
        }

        const userInfo = jwt.verify(token,process.env.JWT_SECRET)
        if(!userInfo){
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }
        const user = await User.findById(userInfo.id,{ password: 0 })

        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        req.user = user
        next() 
        
    } catch (error) {
        console.log(error)
        return res.status(403).json({message: 'Invalid token.'})
    }

}
export default auth