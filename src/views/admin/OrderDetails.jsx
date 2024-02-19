import React, { useEffect, useState } from 'react'
import logo_admin from '../../assets/admin.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { admin_order_update_status, get_admin_order, messageClear } from '../../store/Reducers/orderReducer'
import { useParams } from 'react-router-dom'
import { formatMoney } from '../../store/helpers'
import { toast } from 'react-hot-toast'
const OrderDetails = () => {
    const { orderId } = useParams()
    const dispatch = useDispatch()
    const { order, successMessage, errorMessage } = useSelector(state => state.order)
    useEffect(() => {
        dispatch(get_admin_order(orderId))
    }, [orderId])
    // console.log('order: ', order);
    const [status, setStatus] = useState('')
    useEffect(() => {
        setStatus(order?.deliveryStatus)
    }, [order])
    const update_status = (e) => {

        const status = e.target.value
        setStatus(status)
        // console.log('status: ', status);
        dispatch(admin_order_update_status({ orderId, info: { status } }))
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())

        }
    }, [successMessage, errorMessage, orderId])
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white shadow-md rounded-md'>
                <div className='flex justify-between items-center p-4'>
                    <h2 className='text-xl text-[#2B2A4C]'>Order Details</h2>
                    <select onChange={update_status} value={status} className='px-4 py-2 focus:border-red-500 ouline-none bg-transparent border border-slate-700 rounded-md text-[#2B2A4C]' name="" id="">
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="warehouse">warehouse</option>
                        <option value="placed">placed</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                </div>
                <div className='p-4'>
                    <div className='flex gap-2 text-lg text-[#2B2A4C]'>
                        <h2>#{order._id},</h2>
                        <span>{order.date}</span>
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='w-[32%]'>
                            <div className='pr-3 text-[#2b2a4c] text-lg'>
                                <div className='flex flex-col gap-1'>
                                    <h2 className='pb-2 font-semibold'>Deliver to: {order?.shippingInfo?.name}</h2>
                                    <p>
                                        <span className='sm'>{order.shippingInfo?.address
                                        },{order.shippingInfo?.province} {order.shippingInfo?.city} {order.shippingInfo?.area}</span>
                                    </p>
                                </div>
                                <div className='flex  justify-start items-center gap-3'>
                                    <h2>Payment Status: </h2>
                                    <span className='text-base'>{order.paymentStatus
                                    }</span>
                                </div>
                                <span>Price: {order.price && formatMoney(order?.price)
                                } vnd</span>
                                <div className='mt-4 flex flex-col gap-4'>
                                    <div className='text-[#2B2A4C]'>
                                        {
                                            order.products && order.products.map((el, i) =>
                                                <div className='flex gap-3 text-md'>
                                                    <img className='w-[45px] h-[45px] rounded-md' src={el.images[0]} alt="" />
                                                    <div>
                                                        <h2>{el.name
                                                        }</h2>
                                                        <p>
                                                            <span>Brand: </span>
                                                            <span>{el.brand} </span>
                                                            <span className='text-lg'>Quantity: {el.quantity}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-[68%]'>
                            <div className='pl-3'>
                                <div className='flex flex-col mt-4'>
                                    {order?.subOrder?.map((el, i) =>
                                        <div className='text-[#2B2A4C] mb-6'>
                                            <div className='flex justify-start items-center gap-3'>
                                                <h2>Seller {i + 1} order</h2>
                                                <span>{el.deliveryStatus}</span>
                                            </div>
                                            {
                                                el.products?.map((e, i) => <div className='flex gap-3 text-md mt-2'>
                                                    <img className='w-[45px] h-[45px] rounded-md' src={e.images[0]
                                                    } alt="" />
                                                    <div>
                                                        <h2>{e.name}</h2>
                                                        <p>
                                                            <span>Brand: </span>
                                                            <span>{e.brand} </span>
                                                            <span className='text-lg'>Quantity: {e.quantity}</span>
                                                        </p>
                                                    </div>
                                                </div>)
                                            }

                                        </div>
                                    )}



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