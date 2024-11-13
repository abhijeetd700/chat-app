import React, { useEffect } from 'react'
import axiosInstance from '../axiosConfig'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

const useGetMessages = () => {

    const {messages,setMessages,selectedConversation} = useConversation()

    useEffect(() => {
        
        const getMessages = async () => {
            try {
                const res = await axiosInstance.get(`/messages/${selectedConversation._id}`)
                console.log(res)
                setMessages(res.data.messages)
            } catch (error) {
                console.log(error)
                setMessages([])
                // toast.error(error.message);
            }
        }
        if (selectedConversation?._id) getMessages();
    },[selectedConversation?._id])

  return {messages}
}

export default useGetMessages