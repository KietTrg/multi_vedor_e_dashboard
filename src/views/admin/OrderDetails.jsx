import React, { useEffect, useState } from 'react'
import logo_admin from '../../assets/admin.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { admin_order_update_status, get_admin_order, messageClear } from '../../store/Reducers/orderReducer'
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
                    <h2 className='text-xl '>Order Details</h2>
                    <div className='flex gap-3 items-center'>
                        <h2>Delivery Status:</h2>
                        <select onChange={update_status} value={status} className='px-4 focus:border-green-500 ouline-none bg-transparent   rounded-md ' name="" id="">
                            <option value="pending">pending</option>
                            <option value="processing">processing</option>
                            <option value="warehouse">warehouse</option>
                            <option value="placed">placed</option>
                            <option value="cancelled">cancelled</option>
                        </select>
                    </div>
                </div>
                <div className='p-4'>

                    <div className='flex text-lg justify-between mb-2'>
                        <h2>OrderId: <i className='font-normal text-base'>#{order?._id}</i></h2>
                        <span className=' italic text-gray-400 text-sm'>{order?.date}</span>
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='w-[32%]'>
                            <div className='pr-3  text-lg'>
                                <div className='flex flex-col'>
                                    <h2>Deliver to: {order?.shippingInfo?.name}</h2>
                                    <p>
                                        <span className='text-base text-gray-500'>{order?.shippingInfo?.address
                                        }, {order?.shippingInfo?.province}, {order?.shippingInfo?.city}, {order?.shippingInfo?.area}</span>
                                    </p>
                                </div>
                                <div className='flex mt-3 justify-start items-center gap-3'>
                                    <h2>Payment Status: </h2>
                                    <span className={`text-base ${order?.paymentStatus === 'paid' ? 'text-green-500' : 'text-red-500'}`}>{order?.paymentStatus
                                    }</span>
                                </div>
                                <div className='mt-3'>
                                    <span >Price: {order?.price && formatMoney(order?.price)
                                    } vnđ</span>
                                </div>

                            </div>
                        </div>
                        <div className='w-[68%] border-l border-[#3a4d39]'>
                            <div className='pl-10'>
                                <div className='flex flex-col'>

                                    {
                                        order?.subOrder?.map((el, i) =>
                                            <div className='mb-6'>
                                                < div className='flex justify-start items-center gap-2' >
                                                    <h2>Seller {i + 1}  </h2>
                                                    <span>-</span>
                                                    <span>order {el.deliveryStatus}</span>
                                                    <div />
                                                </div>
                                                {
                                                    el.products?.map((e, i) => <div className='flex gap-3 text-md mt-2'>
                                                        <img className='w-[70px] h-[70px] rounded-md' src={e.images[0]
                                                        } alt="" />
                                                        <div>
                                                            <h2>{e.name}</h2>
                                                            <div className='text-sm text-gray-500'>
                                                                <span>Brand: </span>
                                                                <span>{e.brand} </span>
                                                            </div>
                                                            <span className='text-sm  text-gray-500'>Quantity: {e.quantity}</span>
                                                        </div>
                                                    </div>)
                                                }
                                            </div>
                                        )
                                    }
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='mt-4 flex flex-col gap-4 border-t border-[#3a4d39]'>
                        <div className='mt-4'>
                            {
                                order?.products && order?.products.map((el, i) =>
                                    <div className='flex items-center gap-3 text-md mb-2 border-b pb-2'>
                                        <img className='w-[60px] h-[60px] rounded-md' src={el.images[0]} alt="" />
                                        <div>
                                            <h2>{el?.name
                                            }</h2>
                                            <div className='flex-col gap-3 text-gray-500'>
                                                <span>Brand: </span>
                                                <span>{el?.brand} </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div >
        </div >

    )
}

export default OrderDetails