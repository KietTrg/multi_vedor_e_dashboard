import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowBarDown } from 'react-icons/bs'
import Pagination from '../Pagination'
import { useSelector, useDispatch } from 'react-redux'
import { get_admin_orders } from '../../store/Reducers/orderReducer'
const Orders = () => {
    const dispatch = useDispatch()
    const { totalOrder, myOrders } = useSelector(state => state.order)
    console.log('myOrders: ', myOrders);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [show, setShow] = useState('')

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
                <div className='flex justify-between items-center'>
                    <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-red-500 ouline-none bg-transparent border border-slate-700 rounded-md text-[#2B2A4C]'>
                        <option value="5">5</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                    </select>
                    <input className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#d0d2d6] focus:border-[#FF494C] overflow-hidden' type="text" name='search' placeholder='search' />
                </div>
                <div className='relative mt-5 overflow-x-auto'>
                    <div className='w-full text-sm text-left text-[#2B2A4C]'>
                        <div className=' text-sm text-[#2B2A4C] uppercase  border-b border-red-700'>
                            <div className='flex justify-between items-start'>
                                <div className='py-3 w-[25%]'>Order Id</div>
                                <div className='py-3 w-[13%]'>Price (vnd)</div>
                                <div className='py-3 w-[18%]'>Payment Status</div>
                                <div className='py-3 w-[18%]'>Orders Status</div>
                                <div className='py-3 w-[18%]'>Action</div>
                                <div className='py-3 w-[8%]'>
                                    <BsArrowBarDown />
                                </div>
                            </div>
                        </div>
                        {myOrders.map((el, i) =>
                            <div>
                                <div className='flex justify-between items-start border-b border-red-700'>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[25%]'>{el._id}</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>{el.price}</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>{el.paymentStatus}</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>{el.deliveryStatus}</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'><Link to={`/admin/dashboard/order/details/${el._id}`}>view</Link></div>
                                    <div onClick={(e) => setShow(el._id)} className='font-medium text-[#2B2A4C] cursor-pointer py-4 w-[8%]'><BsArrowBarDown />
                                    </div>
                                </div>
                                <div className={show === el._id ? 'block border-b  border-red-700 bg-[#ffe7e7]' : 'hidden'}>
                                    {el.subOrder.map((e, i) => <div className='flex justify-start items-start border-b border-red-700'>
                                        <div className='font-medium text-[#2B2A4C] py-4 w-[25%] pl-3'>{e._id}</div>
                                        <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>{e.price}</div>
                                        <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>{e.paymentStatus}</div>
                                        <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>{e.deliveryStatus}</div>
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