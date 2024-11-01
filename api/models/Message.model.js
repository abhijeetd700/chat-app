import mongoose, { Schema }  from "mongoose";


const MessageSchema = new mongoose.Schema({

    message:{
        type:String,
        required:true
    },
    senderId:{
        type:Schema.Types.ObjectId, 
        ref: 'User',
        required:true,
    },
    receiverId: {
        type:Schema.Types.ObjectId, 
        ref: 'User',
        required:true,
    },
},{timestamps:true})

const Message = mongoose.model("Message",MessageSchema)

export default Message