
import User from "../models/User.model.js"

export const getUsersSidebar = async(req,res)=>{

    const userId = req.user._id

    try {
        const filteredUsers = await User.find({_id:{$ne : userId}},{ password: 0 })

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})

    }

    User.find
}