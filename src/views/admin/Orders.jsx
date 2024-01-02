import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsArrowBarDown } from 'react-icons/bs'
import Pagination from '../Pagination'
const Orders = () => {
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
                        <div>
                            <div className='flex justify-between items-start border-b border-red-700'>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[25%]'>4521223548</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'><Link to='/admin/dashboard/order/details/1'>view</Link></div>
                                <div onClick={(e) => setShow(!show)} className='font-medium text-[#2B2A4C] cursor-pointer py-4 w-[8%]'><BsArrowBarDown />
                                </div>
                            </div>
                            <div className={show ? 'block border-b  border-red-700 bg-[#ffe7e7]' : 'hidden'}>
                                <div className='flex justify-start items-start border-b border-red-700'>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[25%] pl-3'>4521223548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                </div>
                                <div className='flex justify-start items-start border-b border-red-700'>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[25%] pl-3'>4521223548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between items-start border-b border-red-700'>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[25%]'>4521223548</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'><Link>view</Link></div>
                                <div onClick={(e) => setShow(!show)} className='font-medium text-[#2B2A4C] cursor-pointer py-4 w-[8%]'><BsArrowBarDown />
                                </div>
                            </div>
                            <div className={show ? 'block border-b  border-red-700 bg-[#ffe7e7]' : 'hidden'}>
                                <div className='flex justify-start items-start border-b border-red-700'>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[25%] pl-3'>4521223548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                </div>
                                <div className='flex justify-start items-start border-b border-red-700'>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[25%] pl-3'>4521223548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between items-start border-b border-red-700'>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[25%]'>4521223548</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'><Link>view</Link></div>
                                <div onClick={(e) => setShow(!show)} className='font-medium text-[#2B2A4C] cursor-pointer py-4 w-[8%]'><BsArrowBarDown />
                                </div>
                            </div>
                            <div className={show ? 'block border-b  border-red-700 bg-[#ffe7e7]' : 'hidden'}>
                                <div className='flex justify-start items-start border-b border-red-700'>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[25%] pl-3'>4521223548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                </div>
                                <div className='flex justify-start items-start border-b border-red-700'>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[25%] pl-3'>4521223548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between items-start border-b border-red-700'>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[25%]'>4521223548</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'><Link>view</Link></div>
                                <div onClick={(e) => setShow(!show)} className='font-medium text-[#2B2A4C] cursor-pointer py-4 w-[8%]'><BsArrowBarDown />
                                </div>
                            </div>
                            <div className={show ? 'block border-b  border-red-700 bg-[#ffe7e7]' : 'hidden'}>
                                <div className='flex justify-start items-start border-b border-red-700'>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[25%] pl-3'>4521223548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                </div>
                                <div className='flex justify-start items-start border-b border-red-700'>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[25%] pl-3'>4521223548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between items-start border-b border-red-700'>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[25%]'>4521223548</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'><Link>view</Link></div>
                                <div onClick={(e) => setShow(!show)} className='font-medium text-[#2B2A4C] cursor-pointer py-4 w-[8%]'><BsArrowBarDown />
                                </div>
                            </div>
                            <div className={show ? 'block border-b  border-red-700 bg-[#ffe7e7]' : 'hidden'}>
                                <div className='flex justify-start items-start border-b border-red-700'>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[25%] pl-3'>4521223548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                </div>
                                <div className='flex justify-start items-start border-b border-red-700'>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[25%] pl-3'>4521223548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[13%]'>548</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                    <div className='font-medium text-[#2B2A4C] py-4 w-[18%]'>pending</div>
                                </div>
                            </div>
                        </div>
                    </div>
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