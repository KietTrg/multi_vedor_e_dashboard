import React, { useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import avataCustomer from '../../assets/avata_customer.jpg'
import { FaList } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { get_customer_message, get_customers, messageClear, send_message, updateMessage } from '../../store/Reducers/chatReducer'
import { socket } from '../../utils/utils'
import toast from 'react-hot-toast'
import { BiSend, BiSolidSend } from "react-icons/bi";

const SellerToCustomer = () => {
    const dispatch = useDispatch()
    const scrollRef = useRef()
    const { userInfo } = useSelector(state => state.auth)
    const { customers, currentCustomer, messages, successMessage, activeCustomer } = useSelector(state => state.chat)
    // console.log('currentCustomer: ', currentCustomer);
    // console.log('customers: ', customers);
    const { customerId } = useParams()
    // console.log('customerId: ', customerId);
    const [text, setText] = useState('')
    const [receverMessage, setReceverMessage] = useState('')


    const [show, setShow] = useState(false)
    // const sellerId = 32
    useEffect(() => {
        dispatch(get_customers(userInfo._id))
    }, [])
    useEffect(() => {
        if (customerId) {
            dispatch(get_customer_message(customerId))
        }
    }, [customerId])
    const send = (e) => {
        e.preventDefault()
        dispatch(send_message({
            senderId: userInfo._id,
            receverId: customerId,
            text,
            name: userInfo?.shopInfo.shopName
        }))
    }

    useEffect(() => {
        if (successMessage) {
            socket.emit('send_seller_message', messages[messages.length - 1])
            setText('')
            dispatch(messageClear())
        }
    }, [successMessage])

    useEffect(() => {
        socket.on('customer_message', e => {
            setReceverMessage(e)

        })
        // socket.on('activeSeller', (sellers) => {
        //     setActiveSeller(sellers)
        // })
    }, [])
    useEffect(() => {
        if (receverMessage) {

            if (customerId === receverMessage.senderId && userInfo._id === receverMessage.receverId) {
                dispatch(updateMessage(receverMessage))
            }
        }
        // else {
        //     toast.success(receverMessage.senderName + ' send a message')
        //     dispatch(messageClear())
        // }
    }, [receverMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full  bg-white shadow-md rounded-md h-[calc(100vh-140px)]'>
                <div className='flex w-full h-full relative text-[#2B2A4C]'>
                    <div className={`w-[280px]  pl-4 h-full absolute z-10 ${show ? '-left-4' : '-left-[336px]'} md:left-0 md:relative transition-all`}>
                        <div className='w-full h-[calc(100vh-177px)] bg-slate-100 md:bg-transparent overflow-y-auto border-r-2 pr-2 mt-4'>
                            <div className='flex justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-[#2B2A4C]'>
                                <h2>Customer</h2>
                                <span onClick={() => setShow(false)} className='block cursor-pointer md:hidden'><IoMdClose /></span>
                            </div>
                            {
                                customers.map((e, i) =>
                                    <Link key={i} to={`/seller/dashboard/chat-customer/${e.friendId}`} className={`h-10 flex justify-start gap-2 items-center px-2 ${customerId === e.friendId ? ' bg-[#ffe7e7] rounded-md' : ''}`}>
                                        {/* <div className=' relative '>
                                            <img className=' border-red-700 border-2 max-w-[38px] p-[2px] rounded-full w-[38px] h-[38px]' src={e.image} alt="" />
                                            <div className='w-[10px] h-[10px] bg-green-500 rounded-full right-0 bottom-0 absolute'></div>
                                        </div> */}
                                        <div className='flex justify-center items-start flex-col w-full'>
                                            <div className='flex justify-center items-center'>
                                                <h2 className=' text-base font-semibold'>{e.name}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }

                        </div>
                    </div>
                    <div className='w-full md:w-[calc(100%-200px)] '>
                        <div className=' w-full shadow-md'>
                            {customerId && <div className='flex justify-between items-center  p-2'>
                                {
                                    customerId && <div className='flex justify-start items-center gap-3'>

                                        <div className='flex justify-center items-start flex-col w-full'>
                                            <div className='flex flex-col gap-2 justify-center items-start'>
                                                <h2 className='text-[#2B2A4C] text-base font-semibold'>{currentCustomer.name}</h2>
                                                {activeCustomer.some(e => e.customerId === customerId) &&
                                                    <div className='flex items-center gap-2'>
                                                        <span className='text-gray-400 text-xs'>Đang hoạt động</span>
                                                        <div className='w-[8px] h-[8px] bg-green-500 rounded-full right-0 bottom-0 '></div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div onClick={() => setShow(!show)} className=' w-[35px] flex lg:hidden h-[35px] rounded-sm bg-[#FFC5C5] shadow-lg hover:shadow-red-500/50 cursor-pointer items-center justify-center'>
                                    <FaList />
                                </div>
                            </div>}
                        </div>
                        <div className='py-4'>
                            <div className='  rounded-md h-[calc(100vh-290px)] p-3 overflow-y-auto'>
                                {customerId ? messages.map((e, i) => {
                                    if (e.senderId === customerId) {
                                        return (
                                            <div ref={scrollRef} key={i} className='w-full flex justify-start items-center'>
                                                <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                    <div className='w-[48px] h-[48px]'><img className='max-w-[48px] p-[2px] rounded-full w-[38px] h-[38px]' src={avataCustomer} alt="avata" /></div>

                                                    <div className='py-2 px-5 rounded-full flex justify-center items-start flex-col w-full bg-gray-400'>

                                                        <span className='text-white text-base font-light'>{e.message}</span>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    } else {
                                        return (
                                            <div ref={scrollRef} key={i} className='w-full flex justify-end items-center'>
                                                <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                    <div className='py-1 px-3 rounded-full flex justify-center items-end flex-col w-full bg-[#739072]'>
                                                        <span className='text-white text-base font-light'>{e.message}</span>
                                                    </div>
                                                </div>
                                                {/* <div>
                                                    <img className='  border-red-700 border-2 max-w-[38px] p-[2px] rounded-full w-[38px] h-[38px]' src={userInfo.image} alt="" />
                                                </div> */}
                                            </div>
                                        )
                                    }
                                }
                                ) : <div className='h-full w-full justify-center items-center flex'>Select Customer</div>
                                }





                            </div>
                        </div>
                        <form onSubmit={send} className='flex gap-3 mx-2'>
                            <input onChange={(e) => setText(e.target.value)} value={text} type="text" placeholder='input your message' className='w-[calc(100%-50px)]  px-4 py-2 rounded-full outline-none  bg-[#e6e6e6]' />
                            <button className='w-[50px] transition-all duration-500  rounded-md  text-[#3a4d39]'>{text ? <BiSolidSend size={35} /> : <BiSend size={35} />}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerToCustomer