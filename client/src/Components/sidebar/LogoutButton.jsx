import { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	// const { loading, logout } = useLogout();
	const {logout} = useContext(AuthContext)
	const navigate = useNavigate();

	const handleClick = async()=>{
		await logout()
		navigate("/login")
	}
	
	return (
		<div className='mt-auto'>
			{/* {!loading ? ( */}
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={handleClick}  />
			{/* ) : ( */}
				{/* <span className='loading loading-spinner'></span> */}
			{/* )} */}
		</div>
	);
};
export default LogoutButton;