import { createContext, useState } from "react"
import axiosInstance from "../axiosConfig"
import toast from "react-hot-toast"

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    //
    const [currUser,setCurrUser] = useState(JSON.parse(localStorage.getItem("user"))||null)
    
    const handleLoginInputError = ({userName,password})=>{

        if(!userName || !password ){
            toast.error("Please provide all inputs")
            return true;
        }
    }
    const login = async (inputs)=>{

        if(handleLoginInputError(inputs)){
            return;
        }

        try {
            const res = await axiosInstance.post("/auth/login",inputs)
            console.log(res)
            const {data,...other} = res
            localStorage.setItem("user",JSON.stringify(data['userData'])) 
            localStorage.setItem("token",data['token'])
            setCurrUser(data['userData'])
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

    const logout = async()=>{

        try {
            const res = await axiosInstance.post("/auth/logout")
            localStorage.removeItem("user")
            setCurrUser(null)
            console.log(res)
            toast.success(res.data.message)

        } catch (error) {
            console.log(error)
            if(error.status){
                toast.error(error.response.data.message)
            }
            else{
                toast.error(error.message)
            }

        }
        // await axiosInstance.post("/auth/logout")
        localStorage.removeItem("user")
        setCurrUser(null)
    }

    // useEffect(()=>{
    //     localStorage.setItem("user",JSON.stringify(currUser))
    // },[currUser])
    
    return(
       <AuthContext.Provider value={{currUser,login,logout}}>
            {children}
       </AuthContext.Provider>
    )
}