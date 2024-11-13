import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckBox'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosConfig'
import useSignUp from '../hooks/useSignUp'


const SignUp = () => {

    
    const {signUp} = useSignUp()
    
    const [inputs,setInputs] = useState({
        fullName:"",
        userName:"",
        password: "",
		confirmPassword: "",
		gender: ""
    })
    
    const handleChange = (e)=>{
        
       const {name,value} = e.target
        // console.log(name+" "+value)
        setInputs({
            ...inputs,
            [name]:value,
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        // console.log(inputs)
        await signUp(inputs)
        
    }

    return (
        
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span> 
                        </label>
                        <input name='fullName' type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' onChange={handleChange} />
                    </div>

                    <div>
                        <label className='label p-2 '>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input name='userName' type='text' placeholder='johndoe' className='w-full input input-bordered h-10' onChange={handleChange}/>
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            name='password'
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input
                            name='confirmPassword'
                            type='password'
                            placeholder='Confirm Password'
                            className='w-full input input-bordered h-10'
                            onChange={handleChange}
                        />
                    </div>

                    {/* Why Pass gender={formData.gender} from Parent to Child Component? */}
                    {/* Centralized State Management: */}
                    {/* By keeping the formData state (including gender) in the parent component, you can manage all form data in a single place. */}
                    
                    {/* Controlled Component Pattern: */}
                    {/* Since formData.gender is managed in the parent, the child component acts as a controlled component, where its displayed value always reflects the gender value in formData. */}
                    <GenderCheckbox  handleChange={handleChange} gender={inputs.gender}/>

                    <Link to="/login">
                        <a className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
                            Already have an account?
                        </a>
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 border border-slate-700 bg-blue-500 text-white'>Sign Up</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignUp