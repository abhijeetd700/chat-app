import React, { useState } from 'react'
import Sidebar from '../Components/sidebar/Sidebar'
import MessageContainer from '../Components/messages/MessageContainer'

const Home = () => {

  // const [chatSelected,setChatSelected] = useState(false)

  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar/>
			<MessageContainer/>
    </div>
  )
}

export default Home