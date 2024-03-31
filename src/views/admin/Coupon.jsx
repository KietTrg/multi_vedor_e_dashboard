import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { HashLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { couponAdd, getCoupons, messageClear, deleteCoupon } from '../../store/Reducers/couponReducer'
import { toast } from 'react-hot-toast'
import moment from 'moment'
import { IoMdClose } from 'react-icons/io'
const Coupon = () => {
    const [couponTime, setCouponTime] = useState('')
    const [couponName, setCouponName] = useState('')
    const [show, setShow] = useState(false)
    const [couponPercent, setCouponPercent] = useState('')
    const dispatch = useDispatch()
    const { loader, errorMessage, successMessage, coupons } = useSelector(state => state.coupon)
    // console.log('coupons: ', coupons);
    // const loader = false
    const add = (e) => {
        e.preventDefault()
        dispatch(couponAdd({ couponTime: new Date(couponTime).getTime(), couponPercent, couponName }))
        setCouponName('')
        setCouponTime('')
        setCouponPercent('')
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(getCoupons());
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };

    }, [])

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            dispatch(getCoupons())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage])
    const delete_Coupon = (cId) => {
        // console.log('cId: ', cId);
        dispatch(deleteCoupon(cId))
    }
    const checkStatusCoupon = (expire) => {
        if (Date.now() < new Date(expire).getTime()) {
            return true
        }
        return false
    }
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className=' flex lg:hidden justify-between items-center mb-5 p-4 bg-white shadow-md rounded-md'>
                <h1 className='text-[#2B2A4C] font-semibold text-sm'>Coupon</h1>
                <button onClick={() => setShow(true)} className='transition-all duration-500 bg-[#739072] hover:bg-[#3a4d39] shadow-lg px-4 py-2 cursor-pointer text-white rounded-md text-sm'>Add Coupon</button>
            </div>
            <div className='flex flex-wrap w-full'>
                <div className='w-full lg:w-7/12'>
                    <div className='w-full p-4 bg-white shadow-md rounded-md'>
                        {/* <Search setParPage={setParPage} searchValue={searchValue} setSearchValue={setSearchValue} /> */}
                        <div className='relative overflow-x-auto'>
                            <table className='w-full text-sm text-left text-[#2B2A4C]'>
                                <thead className='text-sm text-[#2B2A4C] uppercase border-b border-[#3a4d39]'>
                                    <tr>
                                        <th scope='col' className='py-3 px-4'>No</th>
                                        <th scope='col' className='py-3 px-4'>Name</th>
                                        <th scope='col' className='py-3 px-4'>Expire</th>
                                        <th scope='col' className='py-3 px-4'>Status</th>
                                        <th scope='col' className='py-3 px-4'>Precent</th>
                                        <th scope='col' className='py-3 px-4'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        coupons.map((el, index) => <tr key={index}>
                                            <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'>{index + 1}</td>
                                            <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'>
                                                <span>{el.name}</span>
                                            </td>
                                            <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'><span>{moment(el.expire).format('DD/MM/YYYY h:mm:ss A')}</span></td>
                                            <td scope='row' className={`py-3
                                             px-4 font-normal whitespace-nowrap ${Date.now() < new Date(el.expire).getTime() ? 'text-green-500' : 'text-red-500'}`}><span>{checkStatusCoupon(el.expire) ? 'active' : 'deactive'}</span></td>
                                            <td scope='row' className='py-3
                                             px-4 font-normal whitespace-nowrap'>
                                                <span>{el.percent}%</span>
                                            </td>
                                            <td scope='row' className='py-3
                                             px-4 font-normal'>
                                                <div className='flex justify-start  items-center gap-4'>
                                                    {/* <Link to={`/admin/dashboard/edit-category/123`}><FaEdit color='#65B741' size={17} /></Link>*/}
                                                    <button disabled={checkStatusCoupon(el.expire)} onClick={() => delete_Coupon(el._id)}><FaTrash color={`${checkStatusCoupon(el.expire) ? '#999' : '#FF494C'} `} size={17} /></button>
                                                </div>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                            {/* <Pagination
                                pageNumber={currentPage}
                                setPageNumber={setCurrentPage}
                                totalItem={totalCategory}
                                parPage={parPage}
                                showItem={3}
                            /> */}
                        </div>
                    </div>
                </div>
                <div className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed z-[9999] top-0 transition-all duration-500 ${show ? 'right-0' : '-right-[340px]'}  `}>
                    <div className='w-full pl-5'>
                        <div className=' bg-white shadow-md rounded-md h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#2B2A4C]'>
                            <div className='flex justify-between items-center mb-4'>
                                <h1 className='text-[#2B2A4C] font-semibold text-xl'>Add Coupon</h1>
                                <div onClick={() => setShow(false)} className='block lg:hidden cursor-pointer'><IoMdClose size={25} className='text-[#2B2A4C] hover:text-[#FF494C]' /></div>
                            </div>
                            <form onSubmit={add} >
                                <div className='flex flex-col w-full gap-2 mb-3'>
                                    <label htmlFor="name">Coupon Name</label>
                                    <input onChange={(e) => setCouponName(e.target.value)} value={couponName} required className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md  focus:border-[#3a4d39] overflow-hidden' type="text" id='name' name='coupon_name' placeholder='coupon name' />
                                </div>
                                <div className='flex flex-col w-full gap-2 mb-3'>
                                    <label htmlFor="time">Coupon time</label>
                                    <input onChange={(e) => setCouponTime(e.target.value)} value={couponTime} required className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md  focus:border-[#3a4d39] overflow-hidden' type="datetime-local" id='time' name='coupon_time' placeholder='coupon time' />
                                </div>
                                <div className='flex flex-col w-full gap-2 mb-3'>
                                    <label htmlFor="percent">Percent Coupon</label>
                                    <input onChange={(e) => setCouponPercent(e.target.value)} value={couponPercent} required className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md  focus:border-[#3a4d39] overflow-hidden' type="number" min={0} max={100} id='percent' name='coupon_percent' placeholder='coupon percent' />
                                </div>
                                <div>

                                    {/* <label className='flex rounded-md justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-[#3a4d39] w-full border-[#2B2A4C]' htmlFor="image">
                                        {
                                            imageShow ? <img className=' h-full w-fit' src={imageShow} /> :
                                                <>
                                                    <span><BsImage /></span>
                                                    <span>Select Image</span>
                                                </>
                                        }
                                    </label> */}
                                    {/* <input required className='hidden' type="file" name='image' id='image' /> */}
                                    <div className='mt-4'>
                                        <button className=' transition-all duration-500 bg-[#739072] w-full px-7 py-2 rounded-md my-2 text-white hover:bg-[#3a4d39]'> {
                                            loader ?
                                                <HashLoader size='25' color='#fff' /> : 'Add Category'}
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

export default Coupon