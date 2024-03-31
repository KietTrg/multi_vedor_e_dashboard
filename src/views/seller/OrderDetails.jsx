import React, { useEffect, useState } from 'react'
import logo_admin from '../../assets/admin.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { seller_order_update_status, get_seller_order, messageClear } from '../../store/Reducers/orderReducer'
import { useParams } from 'react-router-dom'
import { formatMoney } from '../../store/helpers'
import { toast } from 'react-hot-toast'

const OrderDetails = () => {
    const { orderId } = useParams()
    // console.log('orderId: ', orderId);
    const dispatch = useDispatch()
    const { order, successMessage, errorMessage } = useSelector(state => state.order)
    // console.log('order: ', order);
    useEffect(() => {
        dispatch(get_seller_order(orderId))
    }, [orderId])
    const [status, setStatus] = useState('')
    useEffect(() => {
        setStatus(order?.deliveryStatus)
    }, [order])
    const update_status = (e) => {

        const status = e.target.value
        setStatus(status)
        // console.log('status: ', status);
        dispatch(seller_order_update_status({ orderId, info: { status } }))
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
                    <h2 className='text-xl '>Order Details</h2>
                    <select onChange={update_status} value={status} className='px-4 py-2 focus:border-green-500 ouline-none bg-transparent border border-slate-700 rounded-md ' name="" id="">
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="warehouse">warehouse</option>
                        <option value="placed">placed</option>
                        <option value="cancelled">cancelled</option>
                    </select>
                </div>
                <div className='p-4'>
                    <div className='flex text-lg justify-between mb-2'>
                        <h2>OrderId: <i className='font-normal text-base'>#{order._id}</i></h2>
                        <span className=' italic text-gray-400 text-sm'>{order.date}</span>
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='w-[32%]'>
                            <div className='pr-3 flex gap-2 flex-col  text-lg'>
                                <div className='flex items-center justify-start gap-3'>
                                    <h2 className='font-normal'>Deliver to: </h2>
                                    <span className='text-base'>{order.shippingInfo}</span>
                                </div>
                                <div className='flex justify-start items-center gap-3'>
                                    <h2>Payment Status: </h2>
                                    <span className={`text-base ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-500'}`}>{order.paymentStatus}</span>
                                </div>
                                <div className='flex justify-start items-center gap-3'>
                                    <h2>Price: </h2>
                                    <span className='text-base'>{order.price && formatMoney(order?.price)} vnđ</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h2 className='font-normal text-lg mt-2 border-b border-[#3a4d39]'>Products:</h2>
                        {
                            order?.products?.map((el, i) =>
                                <div className=''>
                                    <div className='flex gap-3 items-center text-md bg-[#e7f8e9] p-2 rounded-md'>
                                        <img className='w-[45px] h-[45px] rounded-md' src={el?.images[0]} alt="" />
                                        <div>
                                            <h2 className='text-lg'>{el?.name}</h2>
                                            <p>
                                                {/* <span>Brand: </span>
                                                <span>{el?.brand} </span> */}
                                                <span >Quantity: {el?.quantity}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails