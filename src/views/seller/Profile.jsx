import React, { useEffect, useState } from 'react'
import { BsImage } from 'react-icons/bs'
import { FaEdit, FaRegUser } from 'react-icons/fa'
import { BsShopWindow } from "react-icons/bs";
import { toast } from 'react-hot-toast'

import { useDispatch, useSelector } from 'react-redux'
import {
    HashLoader
} from 'react-spinners'
import { profile_image_upload, profile_info_add, messageClear } from '../../store/Reducers/authReducer';
import { overideStyle } from '../../utils/utils';
import { create_stripe_connect_account } from '../../store/Reducers/sellerReducer';
const Profile = () => {

    const [state, setState] = useState({
        shopName: '',
        Division: '',
        District: '',
        subDistrict: '',
    })
    const dispatch = useDispatch()
    const { successMessage, loader, userInfo } = useSelector(state => state.auth)
    // const [show, setShow] = useState({ userInfo })
    // const handlShow = () => {
    //     setShow(!show)
    //     console.log('show: ', show);
    // }
    const add_image = (e) => {
        if (e.target.files.length > 0) {
            const formData = new FormData()
            formData.append('image', e.target.files[0])
            dispatch(profile_image_upload(formData))
        }
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)

        }
    }, [successMessage]);

    const inputHandle = (e) => {
        setState(
            {
                ...state,
                [e.target.name]: e.target.value
            }
        )
    }

    const add = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('shopName', state.shopName)
        formData.append('District', state.District)
        formData.append('Division', state.Division)
        formData.append('subDistrict', state.subDistrict)
        dispatch(profile_info_add(formData))
    }
    return (
        <div className='px-2 lg:px-7 py-5 '>
            <div className='w-full flex flex-wrap'>
                <div className='w-full md:w-6/12'>
                    < div className='w-full p-4 bg-white shadow-md rounded-md text-[#2a2b4c]'>
                        <div className='flex justify-start items-center py-3'>
                            {
                                userInfo?.image ?
                                    <label htmlFor='img' className='h-[200px] w-[250px] relative cursor-pointer overflow-hidden'>
                                        <img src={userInfo.image} alt="" className=' rounded-md w-full h-full' />
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
                            <input onChange={add_image} type="file" className=' hidden' id='img' />
                        </div>
                        <div className=' py-2 px-0 md:px-5'>
                            <div className='flex justify-between text-sm flex-col gap-3 pb-5 relative border-b border-red-700 '>
                                <div className='flex items-center'>
                                    <div className='text-xl font-semibold flex items-center gap-2'>
                                        <span>{userInfo.name}</span>
                                        <span><FaRegUser /></span>
                                    </div>
                                    <div className='right-0  absolute cursor-pointer  transition-all hover:text-[#65B741]'><FaEdit size={17} /></div>
                                </div>
                                <div className='flex gap-4'>
                                    <span>Email: </span>
                                    <span>{userInfo.email} </span>
                                </div>
                                <div className='flex gap-4'>
                                    <span>Role: </span>
                                    <span>{userInfo.role}</span>
                                </div>
                                <div className='flex gap-4'>
                                    <span>Status: </span>
                                    <span>{userInfo.status}</span>
                                </div>
                                <div className='flex gap-4'>
                                    <span>Payment Account: </span>
                                    <p>
                                        {
                                            userInfo?.payment === 'active'
                                                ? <span className='text-green-700 font-normal'>{userInfo.payment} </span>
                                                : <button onClick={() => dispatch(create_stripe_connect_account())} className=' text-blue-800  cursor-pointer  font-normal'>click active </button>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='py-2 px-0 md:px-5 '>
                            {
                                !userInfo?.shopInfo ?
                                    // !show ?
                                    <form onSubmit={add} className='flex flex-col gap-2'>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="Shop">Shop Name</label>
                                            <input onChange={inputHandle} value={state.shopName} type="text" className='px-3 py-1 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden w-full' placeholder='Shop name' id='Shop' name='shopName' />
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="Division">Division</label>
                                            <input onChange={inputHandle} value={state.Division} type="text" className='px-3 py-1 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden w-full' placeholder='Division' id='Division' name='Division' />
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="District">District</label>
                                            <input onChange={inputHandle} value={state.District} type="text" className='px-3 py-1 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden w-full' placeholder='District' id='District' name='District' />
                                        </div>
                                        <div className='flex flex-col gap-1 w-full'>
                                            <label htmlFor="Sub">Sub District</label>
                                            <input onChange={inputHandle} value={state.subDistrict} type="text" className='px-3 py-1 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden w-full' placeholder='Sub district' id='sub' name='subDistrict' />
                                        </div>
                                        <button className=' transition-all duration-500 bg-[#1D976C]  w-full px-7 py-2 rounded-md my-2 text-white hover:bg-[#0f6647]'> {
                                            loader ?
                                                <HashLoader cssOverride={overideStyle} size='25' color='#fff' /> : 'Update Info'}
                                        </button>
                                    </form> : <div className='flex justify-between text-sm flex-col gap-3 pb-5 relative '>
                                        <div className='flex items-center'>
                                            <div className='text-xl font-semibold flex items-center gap-2'>
                                                <span>{userInfo.shopInfo.shopName}</span>
                                                <span><BsShopWindow /></span>
                                            </div>
                                            <div /*onClick={handlShow}*/ className='right-0  absolute cursor-pointer  transition-all hover:text-[#65B741]'><FaEdit size={17} /></div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <span>Division: </span>
                                            <span>{userInfo.shopInfo.Division}</span>
                                        </div>
                                        <div className='flex gap-4'>
                                            <span>District: </span>
                                            <span>{userInfo.shopInfo.District}</span>
                                        </div>
                                        <div className='flex gap-4'>
                                            <span>Sub District: </span>
                                            <span>{userInfo.shopInfo.subDistrict} </span>
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
                                <button className=' transition-all duration-500 bg-[#1D976C]  w-full px-7 py-2 rounded-md my-2 text-white hover:bg-[#0f6647]'> {
                                    loader ?
                                        <HashLoader cssOverride={overideStyle} size='25' color='#fff' /> : 'Update'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile