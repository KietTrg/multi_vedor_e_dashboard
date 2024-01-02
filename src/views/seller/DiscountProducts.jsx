import React, { useState } from 'react'
import Search from '../components/Search'
import Pagination from '../Pagination'
import { Link } from 'react-router-dom'
import logo_admin from '../../assets/admin.jpg'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { LuEye } from 'react-icons/lu'

const DiscountProducts = () => {
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
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Image</th>
                                <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4'>Category</th>
                                <th scope='col' className='py-3 px-4'>Brand</th>
                                <th scope='col' className='py-3 px-4'>Price (VND)</th>
                                <th scope='col' className='py-3 px-4'>Discount</th>
                                <th scope='col' className='py-3 px-4'>Stock </th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [1, 2, 3, 4, 5].map((el, key) => <tr key={key}>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'>{el}</td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'>
                                        <img className='w-[45px] h-[45px] rounded-md' src={logo_admin} alt="" />
                                    </td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'><span>Điện thoại iPhone 12 </span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'><span>Mobile</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'><span>Apple</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'><span>12.000.000</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'><span>10%</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'><span>20</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium'>
                                        <div className='flex justify-start  items-center gap-4'>
                                            <Link><FaEdit color='#65B741' size={17} /></Link>
                                            <Link><LuEye color='#3e59e1' size={17} /></Link>
                                            <button><FaTrash color='#FF494C' size={17} /></button>
                                        </div>
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

export default DiscountProducts