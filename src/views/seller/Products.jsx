import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import Pagination from '../Pagination'
import { Link } from 'react-router-dom'
import logo_admin from '../../assets/admin.jpg'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { LuEye } from 'react-icons/lu'
import { useSelector, useDispatch } from 'react-redux'
import { add_product, messageClear, get_product, get_products } from '../../store/Reducers/productReducer'
const Products = () => {
    const dispatch = useDispatch()
    const { products, totalProduct } = useSelector(state => state.product)
    console.log('products: ', products);
    const [parPage, setParPage] = useState(5)
    console.log('parPage: ', parPage);
    const [currentPage, setCurrentPage] = useState(1)
    console.log('currentPage: ', currentPage);
    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_products(obj))
    }, [searchValue, parPage, currentPage])
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
                                products.map((el, index) => <tr key={index}>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'>{((currentPage || 1) - 1) * parPage + index + 1}</td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'>
                                        <img className='w-[45px] h-[45px] rounded-md' src={el.images
                                        [0]} alt="" />
                                    </td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'><span>{el.name.slice(0, 20)}...</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'><span>{el.category
                                        }</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'><span>{el.brand}</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'><span>{el.price}</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'>{el.discount === 0 ? <span>No discount</span> : <span>{el.discount}%</span>}</td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'><span>{el.stock}</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-medium'>
                                        <div className='flex justify-start  items-center gap-4'>
                                            <Link to={`/seller/dashboard/edit-product/${el._id}`}><FaEdit color='#65B741' size={17} /></Link>
                                            <Link><LuEye color='#3e59e1' size={17} /></Link>
                                            <button><FaTrash color='#FF494C' size={17} /></button>
                                        </div>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                {totalProduct <= parPage ? "" : <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={totalProduct}
                        parPage={parPage}
                        showItem={3}
                    />
                </div>}
            </div>
        </div>
    )
}

export default Products