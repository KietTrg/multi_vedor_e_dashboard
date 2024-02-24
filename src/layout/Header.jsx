import React from 'react'
import { FaList } from 'react-icons/fa'
import admin_logo from '../assets/admin.jpg'
import { useDispatch, useSelector } from 'react-redux'
const Header = ({ showSidebar, setShowSidebar }) => {
  const { userInfo } = useSelector(state => state.auth)
  console.log('userInfo: ', userInfo);
  return (
    <div className=' fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40'>
      <div className='ml-0 lg:ml-[260px] shadow-md rounded-md h-[65px] flex justify-between items-center bg-white text-[#2B2A4C] px-5 transition-all'>
        <div onClick={() => setShowSidebar(!showSidebar)} className=' w-[35px] flex lg:hidden h-[35px] rounded-sm bg-[#FFC5C5] shadow-lg hover:shadow-red-500/50 cursor-pointer items-center justify-center'>
          <span><FaList /></span>
        </div>
        <div className=' mb:block'>
          <input className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#d0d2d6] focus:border-[#FF494C] overflow-hidden' type="text" name='search' placeholder='search' />
        </div>
        <div className='flex justify-center items-center gap-8 relative'>
          <div className='flex justify-center items-center '>
            <div className='flex justify-center items-center gap-3'>
              <div className='flex justify-center items-center flex-col text-end'>
                <h2 className='text-sm font-bold'>{userInfo?.name}</h2>
                <span className='text-[14px] w-full font-normal'>{userInfo?.role}</span>
              </div>
              <img className='w-[45px] h-[45px] rounded-full overflow-hidden' src={userInfo?.image !== 'admin.png' ? userInfo?.image : admin_logo} alt="avata" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header