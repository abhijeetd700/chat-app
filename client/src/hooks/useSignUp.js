import React from 'react'
import toast from 'react-hot-toast';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
    
    const navigate = useNavigate();

    const signUp = async ({fullName,userName,password,confirmPassword,gender})=>{

        if(handleInputErrors({fullName,userName,password,confirmPassword,gender})){
            return;
        }

        try {
            const res = await axiosInstance.post("/auth/signup",JSON.stringify({fullName,userName,password,confirmPassword,gender}))
            console.log(res)
            navigate("/login")
            toast.success("User Registration Successful. Please Login..!")
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
    
    return {signUp}
    
}

const handleInputErrors = ({fullName,userName,password,confirmPassword,gender})=>{
    
    if(!fullName || !userName || !password || !confirmPassword || !gender){
        toast.error("Please provide all inputs")
        return true;
    }

    if( password !== confirmPassword){
        toast.error("Entered passwords do not match")
        return true;
    }
    return false
}

export default useSignUp