import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaAngleDown } from "react-icons/fa6";
import Pagination from '../Pagination'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { add_shipping, get_admin_orders, messageClear } from '../../store/Reducers/orderReducer'
import { formatMoney } from '../../store/helpers';
const Orders = () => {
    const dispatch = useDispatch()
    const { totalOrder, myOrders, successMessage, errorMessage, fee } = useSelector(state => state.order)
    // console.log('myOrders: ', myOrders);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [show, setShow] = useState('')
    const [shippingFee, setShippingFee] = useState(0)

    const add = (e) => {
        e.preventDefault()
        dispatch(add_shipping({ shippingFee }))
        setShippingFee(0)

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
    }, [successMessage, errorMessage])
    useEffect(() => {
        dispatch(get_admin_orders({
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }))
    }, [currentPage, parPage, searchValue])
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white shadow-md rounded-md'>
                <div className='flex justify-between items-end'>
                    <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-green-500 ouline-none bg-transparent border border-slate-700 rounded-md'>
                        <option value="5">5</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                    </select>
                    <form onSubmit={add} className='flex gap-2 items-end justify-center'>
                        <div className='flex flex-col justify-start gap-1'>
                            <span className='text-gray-400 text-sm italic'>Current shipping fee: {formatMoney(fee)}đ</span>
                            <input type="number" className='px-4 py-2 focus:border-green-500 ouline-none bg-transparent border border-slate-700 rounded-md' name="" id="" onChange={(e) => setShippingFee(e.target.value)} value={shippingFee} placeholder='shipping fee (vnd)' />
                        </div>
                        <button className='transition-all duration-500 bg-[#739072] hover:bg-[#3a4d39] shadow-lg px-4 py-3 cursor-pointer text-white rounded-md text-sm'>{fee ? 'Update Shipping Fee' : 'Create Shipping Fee'}</button>
                    </form>
                    {/* <input className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#d0d2d6] focus:border-[#FF494C] overflow-hidden' type="text" name='search' placeholder='search' /> */}
                </div>
                <div className='relative mt-5 overflow-x-auto'>
                    <div className='w-full text-sm text-left'>
                        <div className=' text-sm uppercase  border-b border-[#3a4d39]'>
                            <div className='flex justify-between items-start font-medium'>
                                <div className='py-3 w-[25%]'>Order Id</div>
                                <div className='py-3 w-[13%]'>Price <i className=' font-medium text-xs'>(Vnđ)</i></div>
                                <div className='py-3 w-[18%]'>Payment Status</div>
                                <div className='py-3 w-[18%]'>Orders Status</div>
                                <div className='py-3 w-[18%]'>Action</div>
                                <div className='py-3 w-[8%]'>

                                </div>
                            </div>
                        </div>
                        {myOrders.map((el, i) =>
                            <div key={i}>
                                <div className='flex justify-between items-start border-b border-[#3a4d39]'>
                                    <div className='font-normal py-4 w-[25%]'>{el._id}</div>
                                    <div className='font-normal py-4 w-[13%]'>{formatMoney(el.price)}</div>
                                    <div className={`font-normal py-4 w-[18%] ${el.paymentStatus === 'paid' ? 'text-green-700' : 'text-red-700'}`}>{el.paymentStatus}</div>
                                    <div className='font-normal py-4 w-[18%]'>{el.deliveryStatus}</div>
                                    <div className='font-normal py-4 w-[18%]'><Link to={`/admin/dashboard/order/details/${el._id}`}>view</Link></div>
                                    <div onClick={(e) => setShow(el._id)} className='font-normal cursor-pointer py-4 w-[8%]'><FaAngleDown />
                                    </div>
                                </div>
                                <div className={show === el._id ? 'block border-b  border-[#3a4d39] bg-[#D0E7D2]' : 'hidden'}>
                                    {el.subOrder.map((e, i) => <div className='flex justify-start items-start border-b border-[#3a4d39]'>
                                        <div className='font-normal py-4 w-[25%] pl-3'>{e._id}</div>
                                        <div className='font-normal py-4 w-[13%]'>{formatMoney(e.price)}</div>
                                        <div className={`font-normal py-4 w-[18%] ${e.paymentStatus === 'paid' ? 'text-green-700' : 'text-red-700'}`}>{e.paymentStatus}</div>
                                        <div className='font-normal py-4 w-[18%]'>{e.deliveryStatus}</div>
                                    </div>)}

                                </div>
                            </div>
                        )}

                    </div>
                </div>
                {totalOrder <= parPage ? "" : <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={totalOrder}
                        parPage={parPage}
                        showItem={3}
                    />
                </div>}
            </div>
        </div>
    )
}

export default Orders