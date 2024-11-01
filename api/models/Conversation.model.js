import mongoose, { Schema }  from "mongoose";

const ConversationSchema = new mongoose.Schema({

    participants:[{type:Schema.Types.ObjectId, ref: 'User',required:true}],
    messages:[{type:Schema.Types.ObjectId, ref: 'Message',required:true,default:[]}]
    
},{timestamps:true})

const Conversation = mongoose.model("Conversation",ConversationSchema)

export default Conversation