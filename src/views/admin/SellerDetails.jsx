import React, { useEffect, useState } from 'react'
import logo_admin from '../../assets/logo_default.jpg'
import { toast } from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_seller, messageClear, seller_status_update } from '../../store/Reducers/sellerReducer'
import { FaRegUser } from 'react-icons/fa'
import { IoLocationOutline } from "react-icons/io5";
const SellerDetails = () => {
    const dispatch = useDispatch()
    const { seller, successMessage } = useSelector(state => state.seller)
    const { sellerId } = useParams()
    useEffect(() => {
        dispatch(get_seller(sellerId))

    }, [sellerId])
    const [status, setStatus] = useState('')
    const submit = (e) => {
        e.preventDefault()
        dispatch(seller_status_update({
            sellerId,
            status
        }))
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }


    }, [successMessage])
    useEffect(() => {
        if (seller) { setStatus(seller.status) }
    }, [seller])

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full flex flex-wrap'>
                <div className='w-full md:w-4/12'>
                    <div className='w-full p-4 bg-white shadow-md rounded-md'>
                        <img className='w-full rounded-md h-[330px] ' src={seller?.image ? seller.image : `${logo_admin}`} alt="" />
                        <div>
                            <form onSubmit={submit}>
                                <div className='flex justify-between gap-4 py-3'>
                                    <select value={status} onChange={(e) => setStatus(e.target.value)} className='w-full px-6 py-1 focus:border-green-500 ouline-none bg-transparent border border-slate-700 rounded-md text-[#2B2A4C]' name="" id="">
                                        <option value="">--select status--</option>
                                        <option value="active">Active</option>
                                        <option value="deactive">Deactive</option>
                                    </select>

                                    <button className=' transition-all duration-500 bg-[#739072]  px-7 py-2 rounded-md  text-white hover:bg-[#3a4d39]'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-8/12'>
                    <div className='w-full pl-0 md:pl-7 mt-6 md:mt-0 '>
                        <div className='bg-white shadow-md rounded-md p-4'>
                            <div className='py-2 text-lg flex gap-3 items-center justify-between'>
                                <div className='flex gap-3 items-center'>
                                    <h2>Basic Info</h2>
                                    <span><FaRegUser /></span>
                                </div>
                                <Link to='/admin/dashboard/sellers' className='transition-all duration-500 bg-[#739072]  px-4  rounded-md  text-white hover:bg-[#3a4d39]'>Back</Link>

                            </div>
                            <div className='p-4 bg-[#d9e1da] flex justify-between text-sm flex-col gap-2 shadow-md rounded-md'>
                                <div className='flex gap-2'>
                                    <span className='font-medium'>Name: </span>
                                    <span>{seller.name}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='font-medium'>Email: </span>
                                    <span>{seller.email}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='font-medium'>Role: </span>
                                    <span>{seller.role}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className={`font-medium `}>Status: </span>
                                    <span className={`${seller.status === 'active' ? 'text-green-600' : 'text-red-500'}`}>{seller.status}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='font-medium'>Payment Account: </span>
                                    <span className={`${seller.payment === 'active' ? 'text-green-600' : 'text-red-500'}`}>{seller.payment}</span>
                                </div>
                            </div>
                            <div className='py-2 text-lg mt-1 flex gap-3 items-center'>
                                <h2>Address</h2>
                                <span><IoLocationOutline /></span>
                            </div>
                            <div className='p-4 bg-[#d9e1da] flex justify-between text-sm flex-col gap-2 shadow-md rounded-md'>
                                <div className='flex gap-2'>
                                    <span className='font-medium'>Shope Name: </span>
                                    <span>{seller.shopInfo?.shopName}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='font-medium'>Division </span>
                                    <span>{seller.shopInfo?.Division}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='font-medium'>District </span>
                                    <span>{seller.shopInfo?.District}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span className='font-medium'>Sub-District: </span>
                                    <span>{seller.shopInfo?.subDistrict}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerDetails