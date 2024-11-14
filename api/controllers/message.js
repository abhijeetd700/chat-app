import Conversation from "../models/Conversation.model.js"
import Message from "../models/Message.model.js"
import User from "../models/User.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js"

export const getMessage = async(req,res)=>{
    
    const receiverId = req.params.id
    const senderId = req.user.id
    const user = await User.findById(receiverId)
    // console.log(receiverId+" "+senderId+" "+user)
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    try {

        const conversation = await Conversation.findOne({ participants:{$all:[senderId,receiverId]} }).populate("messages")
        
        if(!conversation){
            return res.status(404).json({messages:[]})
        }
        const messages = conversation.messages
        return res.status(200).json({messages})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message,name:error.name,stack:error.stack})
    }
    
}

export const sendMessage = async(req,res)=>{
    
    try{

        const {message} = req.body
        const receiverId = req.params.id
        const senderId = req.user._id

        const newMessage = new Message({
            message,
            senderId,
            receiverId
        })
        // console.log(newMessage)

        if(!newMessage){
            throw new Error("Internal Server Error")
        }
        
        let conversation = await Conversation.findOne({participants:{$all:[receiverId,senderId]}})
        // console.log(conversation)
        if(!conversation){
            conversation = new Conversation({
                participants:[receiverId,senderId],
            })
        }

        conversation.messages.push(newMessage._id)
        
        await Promise.all([conversation.save(),newMessage.save()])

        // SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
        res.status(200).json({message:newMessage})

    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:error.message,name:error.name,stack:error.stack})
    }
}