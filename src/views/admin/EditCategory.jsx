import React, { useEffect, useState } from 'react'
import { BsImage } from 'react-icons/bs'
import { HashLoader } from 'react-spinners'
import { overideStyle } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { get_category } from '../../store/Reducers/categoryReducer'



const EditCategory = () => {
    const { categoryId } = useParams()
    const dispatch = useDispatch()
    const { category, loader } = useSelector(state => state.category)
    const [state, setState] = useState({
        name: '',
        image: ''
    })
    const [imageShow, setImageShow] = useState('')


    useEffect(() => {
        dispatch(get_category(categoryId))
    }, [categoryId])
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
    const update = (e) => {
        e.preventDefault()
        console.log(state)
    }
    useEffect(() => {
        setState({
            name: category.name,
        })
        setImageShow(category.image)
    }, [category])
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='flex lg:hidden justify-between items-center mb-5 p-4 bg-white shadow-md rounded-md'>
                <h1 className='text-[#2B2A4C] font-semibold text-sm'>Categorys</h1>
                {/* <button onClick={() => setShow(true)} className='bg-red-500 shadow-lg px-4 py-2 cursor-pointer text-white rounded-md text-sm'>Add Category</button> */}
            </div>
            <div className='flex w-full'>

                <div className='w-full p-4 bg-white shadow-md rounded-md'>
                    <h1 className='text-[#2B2A4C] font-semibold text-xl'>Edit Category</h1>

                    <form onSubmit={update} >
                        <div className='flex flex-col w-full gap-2 my-3 '>
                            <label htmlFor="name">Category Name</label>
                            <input required value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2B2A4C] focus:border-[#FF494C] overflow-hidden' type="text" id='name' name='category_name' placeholder='category name' />
                        </div>
                        <div>

                            <label className='flex rounded-md justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-[#FF494C] w-full border-[#2B2A4C]' htmlFor="image">
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
                                <button className=' transition-all duration-500 bg-[#1D976C]  w-full px-7 py-2 rounded-md my-2 text-white hover:bg-[#0f6647]'> {
                                    loader ?
                                        <HashLoader cssOverride={overideStyle} size='25' color='#fff' /> : 'Add Category'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default EditCategory