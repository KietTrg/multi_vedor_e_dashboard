import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsImage } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { get_categorys } from '../../store/Reducers/categoryReducer'
import { add_product, messageClear } from '../../store/Reducers/productReducer'
import { toast } from 'react-hot-toast'
import { overideStyle } from '../../utils/utils'
import { HashLoader } from 'react-spinners'
// import { formatMoney } from '../../store/helpers'
const AddProduct = () => {
    const dispatch = useDispatch()
    const { categorys } = useSelector(state => state.category)
    const { successMessage, errorMessage, loader } = useSelector(state => state.product)
    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(get_categorys({
            searchValue: '',
            parPage: '',
            page: ''
        }))
    }, [])
    const [state, setState] = useState({
        name: '',
        description: '',
        discount: '',
        price: '',
        brand: '',
        stock: "",
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const [cateShow, setCateShow] = useState(false)
    const [category, setCategory] = useState('')
    const [allCategory, setAllCategory] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const categorySearch = (e) => {
        const value = e.target.value
        setSearchValue(value)
        if (value) {
            let srcValue = allCategory.filter(e => e.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
            setAllCategory(srcValue)
        } else {
            setAllCategory(categorys)
        }
    }
    const [images, setImages] = useState([])
    const [imageShow, setImageShow] = useState([])
    const imageHandle = (e) => {
        const files = e.target.files
        const length = files.length
        if (length > 0) {
            setImages([...images, ...files])
            let imageUrl = []

            for (let i = 0; i < length; i++) {
                imageUrl.push({ url: URL.createObjectURL(files[i]) })
            }
            console.log('imageShow: ', imageUrl);
            setImageShow([...imageShow, ...imageUrl])
        }
    }
    const changeImage = (img, index) => {
        console.log('index: ', index);

        if (img) {
            let tempUrl = imageShow
            console.log('imageShow: ', imageShow);
            let tempImages = images

            tempImages[index] = img
            tempUrl[index] = { url: URL.createObjectURL(img) }
            setImageShow([...tempUrl])
            console.log('tempUrl: ', tempUrl);
            setImages([...tempImages])
        }
    }
    const removeImage = (i) => {
        const filterImage = images.filter((img, index) => index !== i)
        const filterImageUrl = imageShow.filter((img, index) => index !== i)
        setImages(filterImage)
        setImageShow(filterImageUrl)
    }
    useEffect(() => {
        setAllCategory(categorys)
    }, [categorys])

    const add = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', state.name)
        formData.append('description', state.description)
        formData.append('price', state.price)
        formData.append('stock', state.stock)
        formData.append('category', category)
        formData.append('discount', state.discount)
        formData.append('shopName', userInfo?.shopInfo?.shopName)
        formData.append('brand', state.brand)
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i])
        }

        dispatch(add_product(formData))
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            setState({
                name: ' ',
                description: ' ',
                discount: ' ',
                price: ' ',
                brand: ' ',
                stock: " ",
            })
            setImageShow([])
            setImages([])
            setCategory('')
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())

        }

    }, [successMessage, errorMessage])

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full bg-white shadow-md p-4 rounded-md'>
                <div className='flex justify-between items-center pb-4'>
                    <h1 className='text-[#2B2A4C] text-xl font-semibold'>Add Product</h1>
                    <Link className='transition-all duration-500 bg-[#739072] px-7 py-2 rounded-md my-2 text-white hover:bg-[#3a4d39]'
                        to='/seller/dashboard/all-product'>All Products</Link>
                </div>
                <div>
                    <form onSubmit={add}>
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#2B2A4C]'>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="name">Product name</label>
                                <input required className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-green-500 overflow-hidden'
                                    onChange={inputHandle} value={state.name} type="text" name="name" id="name" placeholder='product name' />
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="brand">Product brand</label>
                                <input required className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-green-500 overflow-hidden'
                                    onChange={inputHandle} value={state.brand} type="text" name="brand" id="brand" placeholder='product brand' />
                            </div>
                        </div>
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#2B2A4C'>
                            <div className='flex flex-col w-full gap-1 relative'>
                                <label htmlFor="category">Category</label>
                                <input required readOnly onClick={() => setCateShow(!cateShow)} className=' text-[#2A2B4C] px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md  focus:border-green-500 overflow-hidden'
                                    onChange={inputHandle} value={category} type="text" id="category" placeholder='product category' />
                                <div className={`absolute top-[101%] bg-gray-100 rounded-md shadow-md w-full transition-all ${cateShow ? ' scale-100' : 'scale-0'}`}>
                                    <div className=' w-full px-4 py-2 fixed'>
                                        <input value={searchValue} onChange={categorySearch} className='text-[#2A2B4C] px-3 w-full py-2 outline-none border bg-transparent border-slate-700 rounded-md  focus:border-green-500 overflow-hidden'
                                            type="text" placeholder='search' />
                                    </div>
                                    <div className='pt-14'></div>
                                    <div className='flex justify-start items-start flex-col h-[200px] overflow-x-scroll'>
                                        {allCategory.map((el, key) => <span className={`px-4 py-2 hover:bg-[#D0E7D2] hover:shadow-md cursor-pointer w-full ${category === el.name && 'bg-[#D0E7D2]'}`} onClick={() => {
                                            setCateShow(false)
                                            setCategory(el.name)
                                            setSearchValue('')
                                            setAllCategory(categorys)
                                        }} key={key}>{el.name}</span>)}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="stock">Stock</label>
                                <input required className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-green-500 overflow-hidden'
                                    onChange={inputHandle} value={state.stock} type="number" min='0' name="stock" id="stock" placeholder='product stock' />
                            </div>
                        </div>
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#2B2A4C'>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="price">Price</label>
                                <input required className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-green-500 overflow-hidden'
                                    onChange={inputHandle} value={state.price} type="number" min='0' name="price" id="price" placeholder='price' />
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="discount">Discount</label>
                                <input required className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-green-500 overflow-hidden'
                                    onChange={inputHandle} value={state.discount} type="number" min='0' name="discount" id="discount" placeholder='discount %' />
                            </div>
                        </div>

                        <div className='flex flex-col w-full gap-1 mb-5'>
                            <label htmlFor="description">Description</label>
                            <textarea required rows={8} className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-green-500 overflow-hidden'
                                onChange={inputHandle} value={state.description} type="number" min='0' name="description" id="price" placeholder='description' />
                        </div>

                        <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#2a2b4c] mb-4'>
                            {
                                imageShow.map((el, index) => <div className='h-[180px] relative'>
                                    <label htmlFor={index}>
                                        <img className='w-full h-full rounded-md' src={el.url} alt="" />
                                    </label>
                                    <input onChange={(e) => changeImage(e.target.files[0], index)} type="file" id={index} className='hidden' />
                                    <span className=' absolute top-1 right-1 p-2 z-10 cursor-pointer hover:bg-green-500 hover:text-white bg-white rounded-full transition-all duration-300' onClick={() => removeImage(index)}><IoMdClose /></span>
                                </div>)
                            }
                            <label className='flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed border-black hover:border-green-500 w-full text-[#2a2b4c]' htmlFor="image">
                                <span><BsImage></BsImage></span>
                                <span>Select Image</span>
                            </label>
                            <input required multiple onChange={imageHandle} className='hidden' type="file" id="image" />
                        </div>
                        <div className='flex mt-4'>
                            <button className=' transition-all duration-500 bg-[#739072]   w-full px-7 py-2 rounded-md my-2 text-white hover:bg-[#3a4d39]'> {
                                loader ?
                                    <HashLoader cssOverride={overideStyle} size='25' color='#fff' /> : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct