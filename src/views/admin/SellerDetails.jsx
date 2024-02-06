import React, { useEffect, useState } from 'react'
import logo_admin from '../../assets/logo_default.jpg'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_seller, messageClear, seller_status_update } from '../../store/Reducers/sellerReducer'
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
            <div className='w-full p-4 bg-white shadow-md rounded-md'>
                <div className='w-full flex flex-wrap text-[#2B2A4C]'>
                    <div className='w-3/12 flex justify-center items-center py-3'>
                        <div>
                            <img className='w-full rounded-md h-[230px] ' src={seller?.image ? seller.image : `${logo_admin}`} alt="" />
                        </div>
                    </div>
                    <div className='w-4/12'>
                        <div className='px-0 md:px-5 py-2'>
                            <div className='py-2 text-lg'>
                                <h2>Basic Info</h2>
                            </div>
                            <div className='p-4 bg-[#ffe7e7] flex justify-between text-sm flex-col gap-2 shadow-md rounded-md'>
                                <div className='flex gap-2'>
                                    <span>Name: </span>
                                    <span>{seller.name}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Email: </span>
                                    <span>{seller.email}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Role: </span>
                                    <span>{seller.role}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Status: </span>
                                    <span>{seller.status}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Payment Account: </span>
                                    <span>{seller.payment}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-4/12'>
                        <div className='px-0 md:px-5 py-2'>
                            <div className='py-2 text-lg'>
                                <h2>Address</h2>
                            </div>
                            <div className='p-4 bg-[#ffe7e7] flex justify-between text-sm flex-col gap-2 shadow-md rounded-md'>
                                <div className='flex gap-2'>
                                    <span>Shope Name: </span>
                                    <span>{seller.shopInfo?.shopName}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Division </span>
                                    <span>{seller.shopInfo?.Division}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>District </span>
                                    <span>{seller.shopInfo?.District}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Sub-District: </span>
                                    <span>{seller.shopInfo?.subDistrict}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <form onSubmit={submit}>
                        <div className='flex gap-4 py-3'>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} className='px-4 py-2 focus:border-red-500 ouline-none bg-transparent border border-slate-700 rounded-md text-[#2B2A4C]' name="" id="">
                                <option value="">--select status--</option>
                                <option value="active">Active</option>
                                <option value="deactive">Deactive</option>
                            </select>
                            <button className=' transition-all duration-500 bg-[#1D976C]  px-7 py-2 rounded-md  text-white hover:bg-[#0f6647]'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SellerDetails