import React, { useState } from 'react'
import Search from '../components/Search'
import Pagination from '../Pagination'
import { Link } from 'react-router-dom'
import logo_admin from '../../assets/admin.jpg'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { LuEye } from 'react-icons/lu'


const Orders = () => {
    const [parPage, setParPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full bg-white shadow-md p-4 rounded-md'>
                <Search setParPage={setParPage} searchValue={searchValue} setSearchValue={setSearchValue}></Search>
                <div className='relative overflow-x-auto mt-5'>
                    <table className='w-full text-sm text-left text-[#2B2A4C]'>
                        <thead className='text-sm text-[#2B2A4C] uppercase border-b border-red-700'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>Order Id</th>
                                <th scope='col' className='py-3 px-4'>Price (Vnd)</th>
                                <th scope='col' className='py-3 px-4'>Payment Status</th>
                                <th scope='col' className='py-3 px-4'>Order Status</th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [1, 2, 3, 4, 5, 6].map((el, key) => <tr key={key}>
                                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>#452541101545</td>
                                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>1545</td>
                                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'><span>pending</span></td>
                                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'><span>pending</span></td>
                                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>                                            <Link to={`/seller/dashboard/order/details/14`}><LuEye color='#3e59e1' size={17} /></Link>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
                <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={50}
                        parPage={parPage}
                        showItem={3}
                    />
                </div>
            </div>
        </div>
    )
}

export default Orders