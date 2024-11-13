import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosConfig'

const getConversations = () => {
    const [conversations,setConversations] = useState([])

	useEffect(()=>{

		const getConversations = async()=>{

			try {
				const res = await axiosInstance.get("/users")
				console.log(res)
				setConversations(res.data)
			} catch (error) {
				console.log(error)
				if(error.status){
					toast.error(error.response.data.message)
				}
				else{
					toast.error(error.message)
				}
			}
		}
		getConversations()
	},[])

  return ({conversations})
}

export default getConversations