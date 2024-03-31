import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination'
import { Link } from 'react-router-dom'
import logo_admin from '../../assets/admin.jpg'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { BsImage } from 'react-icons/bs'
import { IoMdClose } from "react-icons/io";
import {
    HashLoader
} from 'react-spinners'
import Swal from 'sweetalert2'
import { toast } from 'react-hot-toast'
import { overideStyle } from '../../utils/utils'
import { useSelector, useDispatch } from 'react-redux'
import { categoryAdd, messageClear, get_categorys, delete_category } from '../../store/Reducers/categoryReducer'
import Search from '../components/Search'
const Category = () => {
    const dispatch = useDispatch()
    const { loader, errorMessage, successMessage, categorys, totalCategory } = useSelector(state => state.category)

    const [parPage, setParPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [show, setShow] = useState(false)
    const [imageShow, setImageShow] = useState('')
    const [state, setState] = useState({
        name: '',
        image: ''
    })
    const imageHandle = (e) => {
        let files = e.target.files
        if (files.length > 0) {
            setImageShow(URL.createObjectURL(files[0]))
            setState({
                ...state,
                image: files[0]
            })
        }
    }
    const add_category = (e) => {
        e.preventDefault()
        dispatch(categoryAdd(state))
    }
    const deleteCategory = (categoryId) => {
        Swal.fire({
            title: 'Are you sure ?',
            text: "Are you ready remove this category?",
            icon: "warning",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {

                dispatch(delete_category({ categoryId }))
            }
        }

        )

    }
    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(get_categorys(obj))
            dispatch(messageClear())
            setState({
                name: '',
                image: ''
            })
            setImageShow('')
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())

        }

    }, [successMessage, errorMessage, searchValue, parPage, currentPage])
    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_categorys(obj))
    }, [searchValue, parPage, currentPage])

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='flex lg:hidden justify-between items-center mb-5 p-4 bg-white shadow-md rounded-md'>
                <h1 className='text-[#2B2A4C] font-semibold text-sm'>Categorys</h1>
                <button onClick={() => setShow(true)} className='transition-all duration-500 bg-[#739072] hover:bg-[#3a4d39] shadow-lg px-4 py-2 cursor-pointer text-white rounded-md text-sm'>Add Category</button>
            </div>
            <div className='flex flex-wrap w-full'>
                <div className='w-full lg:w-7/12'>
                    <div className='w-full p-4 bg-white shadow-md rounded-md'>
                        <Search setParPage={setParPage} searchValue={searchValue} setSearchValue={setSearchValue} />
                        <div className='relative overflow-x-auto'>
                            <table className='w-full text-sm text-left text-[#2B2A4C]'>
                                <thead className='text-sm text-[#2B2A4C] uppercase border-b border-[#3a4d39]'>
                                    <tr>
                                        <th scope='col' className='py-3 px-4'>No</th>
                                        <th scope='col' className='py-3 px-4'>Image</th>
                                        <th scope='col' className='py-3 px-4'>Name</th>
                                        <th scope='col' className='py-3 px-4'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categorys.map((el, index) => <tr key={index}>
                                            <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'>{index + 1}</td>
                                            <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'>
                                                <img className='w-[45px] h-[45px] rounded-md' src={el.image} alt="" />
                                            </td>
                                            <td scope='row' className='py-3
                                             px-4 font-medium whitespace-nowrap'><span>{el.name}</span></td>
                                            <td scope='row' className='py-3
                                             px-4 font-medium'>
                                                <div className='flex justify-start  items-center gap-4'>
                                                    {/* <Link to={`/admin/dashboard/edit-category/${el._id}`}><FaEdit color='#65B741' size={17} /></Link> */}
                                                    <button onClick={() => deleteCategory(el._id)}><FaTrash color='#FF494C' size={17} /></button>
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
                                totalItem={totalCategory}
                                parPage={parPage}
                                showItem={3}
                            />
                        </div>
                    </div>
                </div>
                <div className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${show ? 'right-0' : '-right-[340px]'} z-[9999] top-0 transition-all duration-500 `}>
                    <div className='w-full pl-5'>
                        <div className=' bg-white shadow-md rounded-md h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#2B2A4C]'>
                            <div className='flex justify-between items-center mb-4'>
                                <h1 className='text-[#2B2A4C] font-semibold text-xl'>Add Category</h1>
                                <div onClick={() => setShow(false)} className='block lg:hidden cursor-pointer'><IoMdClose size={25} className='text-[#2B2A4C] hover:text-[#FF494C]' /></div>
                            </div>
                            <form onSubmit={add_category}>
                                <div className='flex flex-col w-full gap-2 mb-3'>
                                    <label htmlFor="name">Category Name</label>
                                    <input required value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2B2A4C] focus:border-[#3a4d39] overflow-hidden' type="text" id='name' name='category_name' placeholder='category name' />
                                </div>
                                <div>

                                    <label className='flex rounded-md justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-[#3a4d39] w-full border-[#2B2A4C]' htmlFor="image">
                                        {
                                            imageShow ? <img className=' h-full w-fit' src={imageShow} /> :
                                                <>
                                                    <span><BsImage /></span>
                                                    <span>Select Image</span>
                                                </>
                                        }
                                    </label>
                                    <input required onChange={imageHandle} className='hidden' type="file" name='image' id='image' />
                                    <div className='mt-4'>
                                        <button className=' transition-all duration-500 bg-[#739072] w-full px-7 py-2 rounded-md my-2 text-white hover:bg-[#3a4d39]'> {
                                            loader ?
                                                <HashLoader cssOverride={overideStyle} size='25' color='#fff' /> : 'Add Category'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category