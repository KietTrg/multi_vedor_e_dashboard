import React from 'react'
import { BsImage } from 'react-icons/bs'
import { FaEdit, FaRegUser } from 'react-icons/fa'
import { BsShopWindow } from "react-icons/bs";
import logo_admin from '../../assets/admin.jpg'

import {
    HashLoader
} from 'react-spinners'
const Profile = () => {
    const image = true
    const loader = false
    const status = 'active'
    const userInfo = false
    return (
        <div className='px-2 lg:px-7 py-5 '>
            <div className='w-full flex flex-wrap'>
                <div className='w-full md:w-6/12'>
                    < div className='w-full p-4 bg-white shadow-md rounded-md text-[#2a2b4c]'>
                        <div className='flex justify-start items-center py-3'>
                            {
                                image ?
                                    <label htmlFor='img' className='h-[200px] w-[250px] relative cursor-pointer overflow-hidden'>
                                        <img src={logo_admin} alt="" className=' rounded-md w-full h-full' />
                                        {loader && <div className='bg-white  h-full w-full opacity-80 left-0 top-0 z-20 flex justify-center items-center absolute'>
                                            <span>
                                                <HashLoader color='#FF494C'></HashLoader>
                                            </span>
                                        </div>}
                                    </label> :
                                    <label className='flex rounded-md justify-center items-center flex-col h-[250px] w-[300px] cursor-pointer border border-dashed border-black hover:border-red-700 relative' htmlFor="img">
                                        <span><BsImage /></span>
                                        <span>Sellect Image</span>
                                        {loader && <div className='bg-white  h-full w-full opacity-80 left-0 top-0 z-20 flex justify-center items-center absolute'>
                                            <span>
                                                <HashLoader color='#FF494C'></HashLoader>
                                            </span>
                                        </div>}

                                    </label>
                            }
                            <input type="file" className=' hidden' id='img' />
                        </div>
                        <div className=' py-2 px-0 md:px-5'>
                            <div className='flex justify-between text-sm flex-col gap-3 pb-5 relative border-b border-red-700 '>
                                <div className='flex items-center'>
                                    <div className='text-xl font-semibold flex items-center gap-2'>
                                        <span>Truong Kiet</span>
                                        <span><FaRegUser /></span>
                                    </div>
                                    <div className='right-0  absolute cursor-pointer  transition-all hover:text-[#65B741]'><FaEdit size={17} /></div>
                                </div>
                                <div className='flex gap-4'>
                                    <span>Email: </span>
                                    <span>kietb2016977@student.ctu.edu.vn </span>
                                </div>
                                <div className='flex gap-4'>
                                    <span>Role: </span>
                                    <span>Seller</span>
                                </div>
                                <div className='flex gap-4'>
                                    <span>Status: </span>
                                    <span>Active </span>
                                </div>
                                <div className='flex gap-4'>
                                    <span>Payment Account: </span>
                                    <p>
                                        {
                                            status === 'active'
                                                ? <span className='text-green-700 font-normal'>pending </span>
                                                : <span className=' text-blue-800  cursor-pointer  font-normal'>click active </span>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='py-2 px-0 md:px-5 '>
                            {
                                userInfo ?
                                    <form className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="Shop">Shop Name</label>
                                            <input type="text" className='px-3 py-1 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden w-full' placeholder='Shop name' id='Shop' name='shopName' />
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="Division">Division</label>
                                            <input type="text" className='px-3 py-1 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden w-full' placeholder='Division' id='Division' name='Division' />
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="District">District</label>
                                            <input type="text" className='px-3 py-1 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden w-full' placeholder='District' id='District' name='District' />
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="Sub">Sub District</label>
                                            <input type="text" className='px-3 py-1 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden w-full' placeholder='Sub district' id='sub' name='subDistrict' />
                                        </div>
                                        <button className=' transition-all duration-500 bg-[#1D976C]  px-7 py-2 rounded-md my-2 text-white hover:bg-[#0f6647]'>Add</button>
                                    </form> : <div className='flex justify-between text-sm flex-col gap-3 pb-5 relative '>
                                        <div className='flex items-center'>
                                            <div className='text-xl font-semibold flex items-center gap-2'>
                                                <span>Truong Kiet Shop</span>
                                                <span><BsShopWindow /></span>
                                            </div>
                                            <div className='right-0  absolute cursor-pointer  transition-all hover:text-[#65B741]'><FaEdit size={17} /></div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <span>Division: </span>
                                            <span>Q.Ninh Kieu</span>
                                        </div>
                                        <div className='flex gap-4'>
                                            <span>District: </span>
                                            <span>Xuan Khanh</span>
                                        </div>
                                        <div className='flex gap-4'>
                                            <span>Sub District: </span>
                                            <span>3/2 </span>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-6/12'>
                    <div className='w-full pl-0 md:pl-7 mt-6 md:mt-0  text-[#2a2b4c]'>
                        <div className='bg-white shadow-md rounded-md p-4' >
                            <h2 className='text-[#2B2A4C] text-xl font-semibold mb-3'>Change Password </h2>
                            <form className='flex flex-col gap-3'>
                                <div className='flex flex-col gap-2 w-full'>
                                    <label htmlFor="email">Email</label>
                                    <input className='px-3 py-1 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden w-full' type="text" placeholder='email' />
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <label htmlFor="email">Old Password</label>
                                    <input className='px-3 py-1 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden w-full' type="password" placeholder='Old Password' />
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <label htmlFor="email">New Password</label>
                                    <input className='px-3 py-1 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden w-full' type="password" placeholder='New Password' />
                                </div>
                                <button className=' transition-all duration-500 bg-[#1D976C]  px-7 py-2 rounded-md my-2 text-white hover:bg-[#0f6647]'>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile