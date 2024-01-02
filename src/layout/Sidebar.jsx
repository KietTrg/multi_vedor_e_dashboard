import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getNavs } from '../navigation/index'
import { BiLogInCircle } from 'react-icons/bi'
import logo from '../assets/logo.png'
const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { role } = useSelector(state => state.auth)
  const { pathname } = useLocation()
  const [allNav, setAllNav] = useState([])
  useEffect(() => {
    const navs = getNavs(role)
    setAllNav(navs)
  }, [role])
  console.log('pathname: ', pathname);

  return (
    <div>
      <div onClick={() => setShowSidebar(false)} className={`fixed duration-200 ${!showSidebar ? ' invisible' : ' visible'} w-screen h-screen bg-white top-0 left-0 z-10`}></div>
      <div className={`w-[260px] fixed  bg-white  z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(33_41_47_/_5%)] transition-all ${showSidebar ? 'left-0' : '-left-[260px] lg:left-0'}`}>
        <div className='h-[70px]  flex justify-center items-center'>
          <Link to='/' className='w-[130px] h-[70px]'>
            <img className='w-full h-full' src={logo} alt="" />
          </Link>
        </div>
        <div className=' mt-3 px-4'>
          <ul className=' flex-col flex gap-2'>
            {allNav.map((el, key) => <li key={key}>
              <Link to={el.path} className={`${pathname === el.path ? ' bg-[#FFC5C5] border-[#FF494C] border-r-4 shadow-md text-[#FF494C] text-lg duration-500' : 'text-[#2B2A4C] font-normal text-lg duration-200'} px-3 py-[9px] rounded-sm  flex justify-start items-center gap-3 hover:pl-4 transition-all w-full`}>
                <span>{el.icon}</span>
                <span>{el.title}</span>
              </Link>
            </li>

            )}
            <li>
              <button className='text-[#2B2A4C] font-normal duration-200 px-3 py-[9px] rounded-sm text-lg flex justify-start items-center gap-3 hover:pl-4 transition-all w-full'>
                <span><BiLogInCircle size={25} /></span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar