import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import Pagination from '../Pagination'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { FaEdit, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { IoIosApps } from "react-icons/io";

import { VscLayersActive } from "react-icons/vsc";
import { formatMoney } from '../../store/helpers'
import { useSelector, useDispatch } from 'react-redux'
import { add_product, messageClear, get_product, get_products, delete_product } from '../../store/Reducers/productReducer'
import Swal from 'sweetalert2'
const Products = () => {
    const dispatch = useDispatch()
    const { products, totalProduct, successMessage } = useSelector(state => state.product)
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

    const deleteProduct = (el, status) => {
        if (el?.status === "active") {
            Swal.fire({
                title: 'Are you sure ?',
                text: "Are you ready hide this product?",
                icon: "warning",
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    dispatch(delete_product({ productId: el._id, status }))

                }
            }
            )
        }
        else {
            Swal.fire({
                title: 'Are you sure ?',
                text: "Are you ready show this product?",
                icon: "warning",
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    dispatch(delete_product({ productId: el._id, status }))

                }
            }
            )
        }
    }

    useEffect(() => {
        if (successMessage) {
            const obj = {
                parPage: parseInt(parPage),
                page: parseInt(currentPage),
                searchValue
            }
            toast.success(successMessage)
            dispatch(get_products(obj))
            dispatch(messageClear())
        }
    }, [successMessage])

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full bg-white shadow-md p-4 rounded-md'>
                <Search setParPage={setParPage} searchValue={searchValue} setSearchValue={setSearchValue}></Search>
                <div className='relative overflow-x-auto mt-5'>
                    <table className='w-full text-sm text-left'>
                        <thead className='text-sm uppercase border-b border-[#3a4d39]'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Image</th>
                                <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4'>Category</th>
                                <th scope='col' className='py-3 px-4'>Brand</th>
                                <th scope='col' className='py-3 px-4'>Price <i className=' font-medium text-xs'>(Vnđ)</i></th>
                                <th scope='col' className='py-3 px-4'>Discount</th>
                                <th scope='col' className='py-3 px-4'>Stock </th>
                                <th scope='col' className='py-3 px-4'>Status </th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((el, index) => <tr key={index}>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'>{((currentPage || 1) - 1) * parPage + index + 1}</td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'>
                                        <img className='w-[45px] h-[45px] rounded-md' src={el.images
                                        [0]} alt="" />
                                    </td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>{el.name.slice(0, 20)}...</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>{el.category
                                        }</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>{el.brand}</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>{formatMoney(el.price)}</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'>{el.discount === 0 ? <span>No discount</span> : <span>{el.discount}%</span>}</td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>{el.stock}</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>{el.status}</span></td>
                                    <td scope='row' className='py-3
                                             px-4 font-normal'>
                                        <div className='flex justify-start  items-center gap-4'>
                                            <Link to={`/seller/dashboard/edit-product/${el._id}`}><FaEdit className='transition-all duration-500 text-[#739072] hover:text-green-600' size={17} /></Link>
                                            {
                                                el.status === "active" ?
                                                    <button onClick={() => deleteProduct(el, "deactive")}><FaRegEye size={17} /></button> :
                                                    <button onClick={() => deleteProduct(el, "active")}><FaRegEyeSlash color='red' size={17} /></button>}
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