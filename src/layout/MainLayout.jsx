import React, { useState } from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  return (
    <div className=' bg-slate-100 w-full min-h-screen'>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar}></Header>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}></Sidebar>
      <div className='ml-0 lg:ml-[260px] pt-[95px] transition-all'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default MainLayout