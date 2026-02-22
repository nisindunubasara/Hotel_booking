import React from 'react'
import NavBar from '../../components/HotelOwner/NavBar'
import SideBar from '../../components/HotelOwner/SideBar'
import { Outlet } from 'react-router-dom'

const LayOut = () => {
  return (
    <div className='flex flex-col h-screen'>
         <NavBar />
         <div className='flex h-full'>
          <SideBar />
          <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
            <Outlet />
          </div>
         </div>
    </div>
  )
}

export default LayOut