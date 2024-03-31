import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo_admin from '../../assets/admin.jpg'
import { LuEye } from "react-icons/lu";
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux'
import { get_active_sellers } from '../../store/Reducers/sellerReducer';
const Sellers = () => {
    const dispatch = useDispatch()
    const [parPage, setParPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    // const [show, setShow] = useState(false)
    const { sellers, totalSeller } = useSelector(state => state.seller)
    useEffect(() => {

        dispatch(get_active_sellers({
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }))
    }, [searchValue, currentPage, parPage])
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white shadow-md rounded-md'>
                <div className='flex justify-between items-center'>
                    <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-green-500 ouline-none bg-transparent border border-slate-700 rounded-md'>
                        <option value="5">5</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                    </select>
                    <input onChange={e => setSearchValue(e.target.value)} value={searchValue} className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md  focus:border-green-500 overflow-hidden' type="text" name='search' placeholder='search name seller' />
                </div>
                <div className='relative overflow-x-auto mt-4'>
                    <table className='w-full text-sm text-left'>
                        <thead className='text-sm uppercase border-b border-[#3a4d39]'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Image</th>
                                <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4'>Shop Name</th>
                                <th scope='col' className='py-3 px-4'>Payment Status</th>
                                <th scope='col' className='py-3 px-4'>Email</th>
                                <th scope='col' className='py-3 px-4'>Division</th>
                                <th scope='col' className='py-3 px-4'>District</th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sellers.map((el, i) => <tr key={i}>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'>{((currentPage || 1) - 1) * parPage + i + 1}</td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'>
                                        <img className='w-[45px] h-[45px] rounded-md' src={el.image} alt="" />
                                    </td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>{el.name}</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>{el.shopInfo?.shopName}</span></td>
                                    <td scope='row' className={`py-3
                                             px-4 font-normal whitespace-nowrap ${el.payment === 'active' ? 'text-green-600' : 'text-red-500'}`}><span>{el?.payment}</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>{el?.email}</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>{el.shopInfo?.Division}</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>{el.shopInfo?.District}</span></td>
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
                {totalSeller <= parPage ? "" : <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={totalSeller}
                        parPage={parPage}
                        showItem={3}
                    />
                </div>}
            </div>
        </div>
    )
}

export default Sellers