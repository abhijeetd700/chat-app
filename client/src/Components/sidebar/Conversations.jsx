import { useEffect, useState } from "react";
import Conversation from "./Conversation";
import axiosInstance from "../../axiosConfig";
import getConversations from "../../hooks/getConversations";

const Conversations = () => {

	const {conversations} = getConversations()

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation)=>{
				return(
					<Conversation key={conversation._id} conversation={conversation}/>
				)
			})}
		</div>
	);
};
export default Conversations;