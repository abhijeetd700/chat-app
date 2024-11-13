import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
	
	const navigate = useNavigate();

	const [inputs,setInputs] = useState({
		userName:'',
		password:''
	})

	const {login} = useContext(AuthContext)

	const handleChange = (e)=>{
		
		const {name,value} =  e.target

		// console.log(name+" "+value)

		setInputs({
			...inputs,
			[name]:value
		})

	}
    const handleSubmit = async (e)=>{
        e.preventDefault()
		await login(inputs)		
		navigate("/")
    }
	
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							name='userName'
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
							onChange={handleChange}
						/>
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
					<Link to="/signup">
						<div className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block cursor-pointer'>
							"Don't" have an account?
						</div>
					</Link>
					
					<div>
						<button className='btn btn-block btn-sm mt-2 bg-blue-500 text-white' >
							{/* {loading ? <span className='loading loading-spinner '></span> : "Login"} */}
                            Login
						</button>
					</div>
				</form>
			</div>
		</div>
    )
}

export default Login