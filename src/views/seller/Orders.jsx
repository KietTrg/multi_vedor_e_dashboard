import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import Pagination from '../Pagination'
import { Link } from 'react-router-dom'
import logo_admin from '../../assets/admin.jpg'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { LuEye } from 'react-icons/lu'
import { get_seller_orders } from '../../store/Reducers/orderReducer'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from '../../store/helpers'


const Orders = () => {
    const dispatch = useDispatch()
    const { totalOrder, myOrders } = useSelector(state => state.order)
    const { userInfo } = useSelector(state => state.auth)
    console.log('userInfo: ', userInfo);
    const [parPage, setParPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {
        dispatch(get_seller_orders({
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue,
            sellerId: userInfo._id
        }))
    }, [currentPage, parPage, searchValue])
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full bg-white shadow-md p-4 rounded-md'>
                <Search setParPage={setParPage} searchValue={searchValue} setSearchValue={setSearchValue}></Search>
                <div className='relative overflow-x-auto mt-5'>
                    <table className='w-full text-sm text-left '>
                        <thead className='text-sm  uppercase border-b border-[#3a4d39]'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>Order Id</th>
                                <th scope='col' className='py-3 px-4'>Price (Vnd)</th>
                                <th scope='col' className='py-3 px-4'>Payment Status</th>
                                <th scope='col' className='py-3 px-4'>Order Status</th>
                                <th scope='col' className='py-3 px-4'>Date</th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myOrders.map((el, key) => <tr key={key}>
                                    <td scope='row' className='py-3 px-4 font-normal whitespace-nowrap'>#{el._id}</td>
                                    <td scope='row' className='py-3 px-4 font-normal whitespace-nowrap'>{formatMoney(el?.price)}</td>
                                    <td scope='row' className='py-3 px-4 font-normal whitespace-nowrap'><span className={`${el.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-500'}`}>{el.paymentStatus}</span></td>
                                    <td scope='row' className='py-3 px-4 font-normal whitespace-nowrap'><span>{el.deliveryStatus}</span></td>
                                    <td scope='row' className='py-3 px-4 font-normal whitespace-nowrap'><span>{el.date}</span></td>
                                    <td scope='row' className='py-3 px-4 font-normal whitespace-nowrap'>
                                        <Link className='transition-all duration-300 hover:text-green-500' to={`/seller/dashboard/order/details/${el._id}`}>View</Link>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
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