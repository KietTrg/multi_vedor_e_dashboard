import React, { useEffect, useState } from 'react'
import logo_admin from '../../assets/admin.jpg'
import { IoMdClose } from 'react-icons/io'
import { FaList } from 'react-icons/fa'
import { send_message_seller_admin, updateAdminMessage, messageClear, get_seller_message } from '../../store/Reducers/chatReducer'
import { useDispatch, useSelector } from 'react-redux'
import { socket } from '../../utils/utils'
const SellerToAdmin = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')
    // const { }
    const sellerId = 32
    const { seller_admin_message, successMessage, activeAdmin } = useSelector(state => state.chat)
    const { userInfo } = useSelector(state => state.auth)
    console.log('userInfo: ', userInfo);
    // console.log('seller_admin_message: ', seller_admin_message);
    useEffect(() => {
        dispatch(get_seller_message(""))
    }, [])
    const send = (e) => {
        e.preventDefault()
        dispatch(send_message_seller_admin({
            senderId: userInfo._id,
            receverId: '',
            message: text,
            senderName: userInfo.name
        }))
        setText('')
    }
    useEffect(() => {
        socket.on('receved_admin_message', message => {
            dispatch(updateAdminMessage(message))
        })
    }, [])
    useEffect(() => {
        if (successMessage) {
            socket.emit('send_message_seller_to_admin', seller_admin_message[seller_admin_message.length - 1])
            dispatch(messageClear())
        }
    }, [successMessage])
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white shadow-md rounded-md h-[calc(100vh-140px)]'>
                <div className='flex w-full h-full relative text-[#2B2A4C]'>

                    <div className='w-full '>
                        <div className='flex justify-between items-center'>
                            {
                                sellerId && <div className='flex justify-start items-center gap-3'>
                                    <div className=' relative'>
                                        <img className='  border-green-500 border-2 max-w-[45px] p-[2px] rounded-full w-[45px] h-[45px]' src={logo_admin} alt="" />
                                        {activeAdmin && <div className='w-[10px] h-[10px] bg-green-500 rounded-full right-0 bottom-0 absolute'></div>}
                                    </div>
                                    <div className='flex justify-center items-start flex-col w-full'>
                                        <div className='flex justify-center items-center'>
                                            <h2 className='text-[#2B2A4C] text-base font-semibold'>Support</h2>
                                        </div>
                                    </div>
                                </div>
                            }
                            {/* <div onClick={() => setShow(!show)} className=' w-[35px] flex lg:hidden h-[35px] rounded-sm bg-[#FFC5C5] shadow-lg hover:shadow-red-500/50 cursor-pointer items-center justify-center'>
                                <FaList />
                            </div> */}
                        </div>
                        <div className='py-4'>
                            <div className=' bg-slate-200 rounded-md h-[calc(100vh-290px)] p-3 overflow-y-auto'>
                                {
                                    seller_admin_message.map((el, i) => {
                                        if (userInfo._id !== el.senderId) {
                                            return (
                                                <div key={i} className='w-full flex justify-start items-center'>
                                                    <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                        <img className='  border-red-700 border-2 max-w-[38px] p-[2px] rounded-full w-[38px] h-[38px]' src={logo_admin} alt="" />

                                                        <div className='py-2 px-3 rounded-md flex justify-center items-start flex-col w-full bg-[#e95353]'>

                                                            <span className='text-white text-base font-light'>{el.message} </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={i} className='w-full flex justify-end items-center'>
                                                    <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                        <div className='py-1 px-2 rounded-md flex justify-center items-end flex-col w-full bg-gray-600'>
                                                            <span className='text-white text-base font-light'>{el.message} </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <img className='  border-red-700 border-2 max-w-[38px] p-[2px] rounded-full w-[38px] h-[38px]' src={logo_admin} alt="" />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }




                            </div>
                        </div>
                        <form onSubmit={send} className='flex gap-3'>
                            <input onChange={(e) => setText(e.target.value)} value={text} type="text" placeholder='input your message' className='w-[calc(100%-150px)] border border-slate-700 px-4 py-2 rounded-md outline-none focus:border-red-700 bg-transparent text-[#2B2A4C] ' />
                            <button className='w-[150px] transition-all duration-500 bg-[#1D976C]  px-7 py-2 rounded-md  text-white hover:bg-[#0f6647]'>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerToAdmin