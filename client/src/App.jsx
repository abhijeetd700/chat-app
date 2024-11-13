import { useContext, useState } from 'react'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './context/AuthContext';


function App() {
  
  const {currUser} = useContext(AuthContext);

  const router = createBrowserRouter([
    { path:"/",element:currUser ? <Home/>:<Navigate to={"/login"}/> },
    {path:"/login",element: currUser ? <Navigate to={"/"}/>:<Login/>},
    {path:"/signup",element: currUser ? <Navigate to={"/"}/>:<SignUp/>},
  ])

  return (
    <div className="flex items-center justify-center h-screen p-4">
        <Toaster/>
        <RouterProvider router={router}/>
    </div>
  )
}

export default App
