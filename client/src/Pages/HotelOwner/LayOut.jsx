import React, { use } from 'react'
import NavBar from '../../components/HotelOwner/NavBar'
import SideBar from '../../components/HotelOwner/SideBar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { useEffect } from 'react'

const LayOut = () => {

  const{isOwner, navigate} = useAppContext();

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  },[isOwner])

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