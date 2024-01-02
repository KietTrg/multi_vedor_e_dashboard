import React from 'react'
import logo_admin from '../../assets/admin.jpg'

const OrderDetails = () => {
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white shadow-md rounded-md'>
                <div className='flex justify-between items-center p-4'>
                    <h2 className='text-xl text-[#2B2A4C]'>Order Details</h2>
                    <select className='px-4 py-2 focus:border-red-500 ouline-none bg-transparent border border-slate-700 rounded-md text-[#2B2A4C]' name="" id="">
                        <option value="">pending</option>
                        <option value="">processing</option>
                        <option value="">warehouse</option>
                        <option value="">placed</option>
                        <option value="">cancelled</option>
                    </select>
                </div>
                <div className='p-4'>
                    <div className='flex gap-2 text-lg text-[#2B2A4C]'>
                        <h2>#88783769836</h2>
                        <span>10 july 2023</span>
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='w-[32%]'>
                            <div className='pr-3 text-[#2b2a4c] text-lg'>
                                <div className='flex flex-col gap-1'>
                                    <h2 className='pb-2 font-semibold'>Deliver to: Warehouse</h2>

                                </div>
                                <div className='flex  justify-start items-center gap-3'>
                                    <h2>Payment Status: </h2>
                                    <span className='text-base'>paid</span>
                                </div>
                                <span>Price: 6799 vnd</span>
                                <div className='mt-4 flex flex-col gap-4'>
                                    <div className='text-[#2B2A4C]'>
                                        <div className='flex gap-3 text-md'>
                                            <img className='w-[45px] h-[45px] rounded-md' src={logo_admin} alt="" />
                                            <div>
                                                <h2>long T-Shart</h2>
                                                <p>
                                                    <span>Brand: </span>
                                                    <span>Easy </span>
                                                    <span className='text-lg'>Quantity: 2</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex gap-3 text-md'>
                                            <img className='w-[45px] h-[45px] rounded-md' src={logo_admin} alt="" />
                                            <div>
                                                <h2>long T-Shart</h2>
                                                <p>
                                                    <span>Brand: </span>
                                                    <span>Easy </span>
                                                    <span className='text-lg'>Quantity: 2</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex gap-3 text-md'>
                                            <img className='w-[45px] h-[45px] rounded-md' src={logo_admin} alt="" />
                                            <div>
                                                <h2>long T-Shart</h2>
                                                <p>
                                                    <span>Brand: </span>
                                                    <span>Easy </span>
                                                    <span className='text-lg'>Quantity: 2</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails