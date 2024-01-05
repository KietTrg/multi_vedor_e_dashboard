import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { update_product, get_product, product_image_update, messageClear } from '../../store/Reducers/productReducer'
import { get_category } from '../../store/Reducers/categoryReducer'
import { BsImage } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { HashLoader } from 'react-spinners'
import { overideStyle } from '../../utils/utils'
import toast from 'react-hot-toast'
const EditProduct = () => {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const { categorys } = useSelector(state => state.category)

    const { product, loader, successMessage, errorMessage } = useSelector(state => state.product)
    // const categorys = [
    //     {
    //         id: 1,
    //         name: 'T-shirt'
    //     },
    //     {
    //         id: 2,
    //         name: 'Shoe'
    //     },
    //     {
    //         id: 3,
    //         name: 'Pant'
    //     },
    //     {
    //         id: 4,
    //         name: 'Sport'
    //     },
    //     {
    //         id: 5,
    //         name: 'Mobile'
    //     },
    //     {
    //         id: 6,
    //         name: 'Watch'
    //     },
    // ]
    useEffect(() => {
        dispatch(get_category({
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

    useEffect(() => {
        dispatch(get_product(productId))

    }, [productId])


    const [cateShow, setCateShow] = useState(false)
    const [category, setCategory] = useState('')
    const [allCategory, setAllCategory] = useState(categorys)

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
    const [newImg, setNewImg] = useState([])
    console.log('newImg: ', newImg);
    console.log('images87: ', images);
    const [imageShow, setImageShow] = useState([])
    const imageHandle = (files) => {
        const length = files.length
        if (length > 0) {
            setNewImg([...newImg, ...files])


            let imageUrl = []

            for (let i = 0; i < length; i++) {
                imageUrl.push(URL.createObjectURL(files[i]))
            }
            console.log('imageShow: ', imageUrl);
            setImageShow([...imageShow, ...imageUrl])
        }
    }
    console.log('imageShow: ', imageShow);

    const changeImage = (img, files) => {
        console.log('img: ', img);
        if (files.length > 0) {
            dispatch(product_image_update({
                oldImage: img,
                newImage: files[0],
                productId
            }))
        }
    }
    const removeImage = (i) => {

        let indexNew
        if (newImg) {
            indexNew = i - images.length
        }
        const filterImage = images.filter((img, index) => index !== i)
        const filterImageUrl = imageShow.filter((img, index) => index !== i)
        const filterNewImage = newImg.filter((img, index) => index !== indexNew)
        setImages(filterImage)
        setNewImg(filterNewImage)
        setImageShow(filterImageUrl)
    }
    const update = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', state.name)
        formData.append('description', state.description)
        formData.append('price', state.price)
        formData.append('stock', state.stock)
        formData.append('category', category)
        formData.append('discount', state.discount)
        formData.append('productId', productId)

        formData.append('brand', state.brand)
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i])
        }
        for (let i = 0; i < newImg.length; i++) {
            formData.append('newImg', newImg[i])
        }

        dispatch(update_product(formData))

    }
    useEffect(() => {
        setState({
            name: product.name,
            description: product.description,
            discount: product.discount,
            price: product.price,
            brand: product.brand,
            stock: product.stock,
        })
        setCategory(product.category)
        setImageShow(product.images)
        setImages(product.images)
    }, [product])
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())

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
                    <h1 className='text-[#2B2A4C] text-xl font-semibold'>Edit Product</h1>
                    <Link className='transition-all duration-500 bg-[#1D976C] px-7 py-2 rounded-md my-2 text-white hover:bg-[#0f6647]'
                        to='/seller/dashboard/all-product'>Products</Link>
                </div>
                <div>
                    <form onSubmit={update}>
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#2B2A4C]'>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="name">Product name</label>
                                <input className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden'
                                    onChange={inputHandle} value={state.name} type="text" name="name" id="name" placeholder='product name' />
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="brand">Product brand</label>
                                <input className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden'
                                    onChange={inputHandle} value={state.brand} type="text" name="brand" id="brand" placeholder='product brand' />
                            </div>
                        </div>
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#2B2A4C'>
                            <div className='flex flex-col w-full gap-1 relative'>
                                <label htmlFor="category">Category</label>
                                <input readOnly onClick={() => setCateShow(!cateShow)} className=' text-[#2A2B4C] px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md  focus:border-[#FF494C] overflow-hidden'
                                    onChange={inputHandle} value={category} type="text" id="category" placeholder='product category' />
                                <div className={`absolute top-[101%] bg-gray-100 rounded-md shadow-md w-full transition-all ${cateShow ? ' scale-100' : 'scale-0'}`}>
                                    <div className=' w-full px-4 py-2 fixed'>
                                        <input value={searchValue} onChange={categorySearch} className='text-[#2A2B4C] px-3 w-full py-2 outline-none border bg-transparent border-slate-700 rounded-md  focus:border-[#FF494C] overflow-hidden'
                                            type="text" placeholder='search' />
                                    </div>
                                    <div className='pt-14'></div>
                                    <div className='flex justify-start items-start flex-col h-[200px] overflow-x-scroll'>
                                        {allCategory.map((el, key) => <span className={`px-4 py-2 hover:bg-[#ffe7e7] hover:shadow-md cursor-pointer w-full ${category === el.name && 'bg-[#ffe7e7]'}`} onClick={() => {
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
                                <input className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden'
                                    onChange={inputHandle} value={state.stock} type="number" min='0' name="stock" id="stock" placeholder='product stock' />
                            </div>
                        </div>
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#2B2A4C'>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="price">Price</label>
                                <input className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden'
                                    onChange={inputHandle} value={state.price} type="number" min='0' name="price" id="price" placeholder='price' />
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="discount">Discount</label>
                                <input className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden'
                                    onChange={inputHandle} value={state.discount} type="number" min='0' name="discount" id="discount" placeholder='discount %' />
                            </div>
                        </div>

                        <div className='flex flex-col w-full gap-1 mb-5'>
                            <label htmlFor="description">Description</label>
                            <textarea rows={8} className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden'
                                onChange={inputHandle} value={state.description} type="number" min='0' name="description" id="price" placeholder='description' />
                        </div>

                        <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#2a2b4c] mb-4'>
                            {/* {
                                imageShow.map((el, index) => <div className='h-[180px] relative'>
                                    <label htmlFor={index}>
                                        <img className='w-full h-full rounded-md' src={el} alt="" />
                                    </label>
                                    <input onChange={(e) => changeImage(e.target.files[0], index)} type="file" id={index} className='hidden' />
                                    <span className=' absolute top-1 right-1 p-2 z-10 cursor-pointer hover:bg-[#FF494C] hover:text-white bg-white rounded-full transition-all duration-300' onClick={() => removeImage(index)}><IoMdClose /></span>
                                </div>)
                            }
                            <label className='flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed border-black hover:border-red-700 w-full text-[#2a2b4c]' htmlFor="image">
                                <span><BsImage></BsImage></span>
                                <span>Select Image</span>
                            </label>
                            <input multiple onChange={imageHandle} 
                            className='hidden' type="file" id="image" /> */}
                            {
                                imageShow?.map((el, i) => <div className='relative'>
                                    <label className='h-[180px] relative' htmlFor={i}>
                                        <img className='w-full h-full rounded-md' src={el} alt="" />
                                    </label>
                                    <input onChange={(e) => changeImage(el, e.target.files)} type="file" id={i} className='hidden' />
                                    <span className=' absolute top-1 right-1 p-2 z-10 cursor-pointer hover:bg-[#FF494C] hover:text-white bg-white rounded-full transition-all duration-300' onClick={() => removeImage(i)}><IoMdClose /></span>
                                </div>)
                            }

                            <label className='flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed border-black hover:border-red-700 w-full text-[#2a2b4c]' htmlFor="image">
                                <span><BsImage></BsImage></span>
                                <span>Select Image</span>
                            </label>
                            <input multiple onChange={(e) => imageHandle(e.target.files)} className='hidden' type="file" id="image" />
                        </div>
                        <div className='flex'>
                            <button className=' transition-all duration-500 bg-[#1D976C]  w-full px-7 py-2 rounded-md my-2 text-white hover:bg-[#0f6647]'> {
                                loader ?
                                    <HashLoader cssOverride={overideStyle} size='25' color='#fff' /> : 'Update Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct