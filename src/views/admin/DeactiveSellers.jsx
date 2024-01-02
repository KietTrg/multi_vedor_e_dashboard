import React, { useState } from 'react'
import Pagination from '../Pagination'
import { Link } from 'react-router-dom'
import logo_admin from '../../assets/admin.jpg'
import { LuEye } from "react-icons/lu";
const DeactiveSellers = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [show, setShow] = useState(false)
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white shadow-md rounded-md'>
                <div className='flex justify-between items-center'>
                    <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-red-500 ouline-none bg-transparent border border-slate-700 rounded-md text-[#2B2A4C]'>
                        <option value="5">5</option>
                        <option value="5">15</option>
                        <option value="5">25</option>
                    </select>
                    <input className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#d0d2d6] focus:border-[#FF494C] overflow-hidden' type="text" name='search' placeholder='search' />
                </div>
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-[#2B2A4C]'>
                        <thead className='text-sm text-[#2B2A4C] uppercase border-b border-red-700'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Image</th>
                                <th scope='col' className='py-3 px-4'>Name</th>

                                <th scope='col' className='py-3 px-4'>Email</th>
                                <th scope='col' className='py-3 px-4'>Payment Status</th>
                                <th scope='col' className='py-3 px-4'>Status</th>

                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [1, 2, 3, 4, 5].map((el, key) => <tr key={key}>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'>{el}</td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'>
                                        <img className='w-[45px] h-[45px] rounded-md' src={logo_admin} alt="" />
                                    </td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>Kiet Truong</span></td>
                                    <td scope='row' className='py-3 px-4 font-normal whitespace-nowrap'><span>kietb2016977@student.ctu.edu.vn</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>pending</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>active</span></td>

                                    <td scope='row' className='py-3
                                             px-4 font-normal'>
                                        <div className='flex justify-start  items-center gap-4'>
                                            <Link><LuEye color='#3e59e1' size={17} /></Link>
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

export default DeactiveSellers