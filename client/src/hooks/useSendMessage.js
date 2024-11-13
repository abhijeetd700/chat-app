import React from 'react'
import useConversation from '../zustand/useConversation';
import axiosInstance from '../axiosConfig';
import toast from 'react-hot-toast';

const useSendMessage = () => {

	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (inputMessage) => {
		
		try {
			const res = await axiosInstance.post(`/messages/send/${selectedConversation._id}`,{message:inputMessage});
			console.log(res)
			setMessages([...messages, res.data.message]);
		} catch (error) {
            console.log(error)
			toast.error(error.message);
		}
	};

	return { sendMessage };
}

export default useSendMessage