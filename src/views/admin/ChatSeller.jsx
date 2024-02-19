import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import logo_admin from '../../assets/admin.jpg'
import { FaList } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { get_sellers, updateAdminMessage, updateSellerMessage } from '../../store/Reducers/chatReducer'
import { send_message_seller_admin, get_admin_message, messageClear } from '../../store/Reducers/chatReducer'
import { socket } from '../../utils/utils'
import { toast } from 'react-hot-toast'
const ChatSeller = () => {
    const dispatch = useDispatch()
    const { sellerId } = useParams()
    // console.log('sellerId: ', sellerId);
    const { sellers, activeSellers, seller_admin_message, currentSeller, successMessage } = useSelector(state => state.chat)
    // console.log('seller_admin_message: ', seller_admin_message);

    // console.log('activeSellers.sellerId: ', activeSellers.sellerId);
    const { userInfo } = useSelector(state => state.auth)
    // console.log('sellers: ', sellers);
    const [show, setShow] = useState(false)
    // const sellerId = 32
    const [text, setText] = useState('')
    const [recevedMessage, setRecevedMessage] = useState('')
    useEffect(() => {
        dispatch(get_sellers())
    }, [])
    const send = (e) => {
        e.preventDefault()
        dispatch(send_message_seller_admin({
            senderId: '',
            receverId: sellerId,
            message: text,
            senderName: 'Plant Go admin support'
        }))
        setText('')
    }
    useEffect(() => {
        if (sellerId) { dispatch(get_admin_message(sellerId)) }
    }, [sellerId])
    useEffect(() => {
        if (successMessage) {
            socket.emit('send_message_admin_to_seller', seller_admin_message[seller_admin_message.length - 1])
            dispatch(messageClear())
        }
    }, [successMessage])
    useEffect(() => {
        socket.on('receved_seller_message', message => {
            setRecevedMessage(message)
        })
    }, [])
    useEffect(() => {
        if (recevedMessage) {
            if (recevedMessage.senderId === sellerId && recevedMessage.receverId === '') {
                dispatch(updateSellerMessage(recevedMessage))
            } else {
                toast.success(recevedMessage.senderName + ' send a message')
            }
        }
    }, [recevedMessage])
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white shadow-md rounded-md h-[calc(100vh-140px)]'>
                <div className='flex w-full h-full relative text-[#2B2A4C]'>
                    <div className={`w-[280px] h-full absolute z-10 ${show ? '-left-4' : '-left-[336px]'} md:left-0 md:relative transition-all`}>
                        <div className='w-full h-[calc(100vh-177px)] bg-slate-100 rounded-md md:bg-transparent overflow-y-auto'>
                            <div className='flex -text-xs justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-[#2B2A4C]'>
                                <h2>Sellers ({sellers.length})</h2>
                                <span onClick={() => setShow(false)} className='block cursor-pointer md:hidden'><IoMdClose /></span>
                            </div>
                            {
                                sellers.map((el, i) => <Link to={`/admin/dashboard/chat-seller/${el._id}`} key={i} className={`h-[60px] flex justify-start gap-2 items-center text-[#2B2A4C] p-2 ${sellerId === el._id ? ' bg-gray-200 rounded-md' : ''}`}>
                                    <div className=' relative '>
                                        <img className=' border-red-700 border-2 max-w-[38px] p-[2px] rounded-full w-[38px] h-[38px]' src={el.image} alt="avata" />
                                        {activeSellers.some(e => e.sellerId === el._id) && <div className='w-[10px] h-[10px] bg-green-500 rounded-full right-0 bottom-0 absolute'></div>}
                                    </div>
                                    <div className='flex justify-center items-start flex-col w-full'>
                                        <div className='flex justify-center items-center'>
                                            <h2 className='text-[#2B2A4C] text-base font-semibold'>{el.name}</h2>
                                        </div>
                                    </div>
                                </Link>)
                            }

                        </div>
                    </div>
                    <div className='w-full md:w-[calc(100%-200px)] md:pl-4'>
                        <div className='flex justify-between items-center'>
                            {
                                sellerId && <div className='flex justify-start items-center gap-3'>
                                    <div className=' relative'>
                                        <img className='  border-green-500 border-2 max-w-[45px] p-[2px] rounded-full w-[45px] h-[45px]' src={currentSeller.image} alt="" />
                                        {currentSeller._id === sellerId && <div className='w-[10px] h-[10px] bg-green-500 rounded-full right-0 bottom-0 absolute'></div>}
                                    </div>
                                    <div className='flex justify-center items-start flex-col w-full'>
                                        <div className='flex justify-center items-center'>
                                            <h2 className='text-[#2B2A4C] text-base font-semibold'>{currentSeller.name}</h2>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div onClick={() => setShow(!show)} className=' w-[35px] flex lg:hidden h-[35px] rounded-sm bg-[#FFC5C5] shadow-lg hover:shadow-red-500/50 cursor-pointer items-center justify-center'>
                                <FaList />
                            </div>
                        </div>
                        <div className='py-4'>
                            <div className=' bg-slate-200 rounded-md h-[calc(100vh-290px)] p-3 overflow-y-auto'>


                                {
                                    sellerId ? seller_admin_message.map((el, i) => {
                                        if (el.senderId === sellerId) {
                                            return (
                                                <div className='w-full flex justify-start items-center'>
                                                    <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                        <img className='  border-red-700 border-2 max-w-[38px] p-[2px] rounded-full w-[38px] h-[38px]' src={logo_admin} alt="" />

                                                        <div className='py-2 px-3 rounded-md flex justify-center items-start flex-col w-full bg-[#e95353]'>

                                                            <span className='text-white text-base font-light'>{el.message} </span>
                                                        </div>
                                                    </div>
                                                </div>)
                                        } else {
                                            return (
                                                <div className='w-full flex justify-end items-center'>
                                                    <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                        <img className='  border-red-700 border-2 max-w-[38px] p-[2px] rounded-full w-[38px] h-[38px]' src={logo_admin} alt="" />

                                                        <div className='py-2 px-3 rounded-md flex justify-center items-start flex-col w-full bg-[#e95353]'>

                                                            <span className='text-white text-base font-light'>{el.message}  </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }) : <div className='h-full w-full justify-center items-center flex'>Select seller</div>
                                }
                            </div>
                        </div>
                        <form onSubmit={send} className='flex gap-3'>
                            <input onChange={(e) => setText(e.target.value)} value={text} readOnly={sellerId ? false : true} type="text" placeholder='input your message' className='w-[calc(100%-150px)] border border-slate-700 px-4 py-2 rounded-md outline-none focus:border-red-700 bg-transparent text-[#2B2A4C] ' />
                            <button disabled={sellerId ? false : true} className='w-[150px] transition-all duration-500 bg-[#1D976C]  px-7 py-2 rounded-md  text-white hover:bg-[#0f6647]'>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatSeller