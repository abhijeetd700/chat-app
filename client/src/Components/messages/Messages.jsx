import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useConversation from "../../zustand/useConversation";
import Message from "./Message";

const Messages = () => {
	
	const {messages} = useGetMessages()
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{messages.length === 0 ? <p className='text-center'>Send a message to start the conversation</p>
			:
			messages.map((message)=>{
						return(
							<div key={message._id} ref={lastMessageRef}>
								<Message  message={message}/>
							</div>
						)
			})}
			
		</div>
	);
};
export default Messages;