
import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LuEye } from "react-icons/lu";
import { get_seller_request } from '../../store/Reducers/sellerReducer';
import Search from '../components/Search'
const SellerRequest = () => {
    const dispatch = useDispatch()
    const { sellers, totalSeller } = useSelector(state => state.seller)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [show, setShow] = useState(false)
    useEffect(() => {
        dispatch(get_seller_request({
            parPage: parPage,
            page: currentPage,
            searchValue
        }))
    }, [parPage, currentPage, searchValue])

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white shadow-md rounded-md'>
                <Search setParPage={setParPage} searchValue={searchValue} setSearchValue={setSearchValue} />
                {totalSeller ?
                    <>
                        <div className='relative overflow-x-auto'>
                            <table className='w-full text-sm text-left'>
                                <thead className='text-sm uppercase border-b border-[#3a4d39]'>
                                    <tr>
                                        <th scope='col' className='py-3 px-4'>No</th>
                                        <th scope='col' className='py-3 px-4'>Name</th>
                                        <th scope='col' className='py-3 px-4'>Email</th>
                                        <th scope='col' className='py-3 px-4'>Payment Status</th>
                                        <th scope='col' className='py-3 px-4'>Status</th>
                                        <th scope='col' className='py-3 px-4'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sellers.map((el, index) => <tr className=' border-b border-[#3a4d39]' key={index}>
                                            <td scope='row' className='py-3
                                                 px-4 font-normal whitespace-nowrap'>{((currentPage || 1) - 1) * parPage + index + 1}</td>

                                            <td scope='row' className='py-3
                                                 px-4 font-normal whitespace-nowrap'><span>{el.name}</span></td>
                                            <td scope='row' className='py-3 px-4 font-normal whitespace-nowrap'><span>{el.email}</span></td>
                                            <td scope='row' className='py-3
                                                 px-4 font-normal whitespace-nowrap'><span>{el.payment}</span></td>
                                            <td scope='row' className='py-3
                                                 px-4 font-normal whitespace-nowrap'><span>{el.status}</span></td>

                                            <td scope='row' className='py-3
                                                 px-4 font-normal'>
                                                <div className='flex justify-start cursor-pointer hover:text-green-500 transition-all duration-300 items-center gap-4'>
                                                    <Link to={`/admin/dashboard/sellers/detail/${el._id}`}>View</Link>
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
                                totalItem={totalSeller}
                                parPage={parPage}
                                showItem={3}
                            />
                        </div>
                    </>
                    : <span className='flex justify-center items-center'>Sellers Request Not Found</span>}
            </div>
        </div>
    )
}

export default SellerRequest