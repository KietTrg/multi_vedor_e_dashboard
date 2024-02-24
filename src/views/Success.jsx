import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    HashLoader
} from 'react-spinners'
import { active_stripe_connect_account } from '../store/Reducers/sellerReducer'
import { messageClear } from '../store/Reducers/authReducer'
const Success = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loader, errorMessage, successMessage } = useSelector(state => state.seller)
    const queryParams = new URLSearchParams(window.location.search)
    // console.log('queryParams: ', queryParams);
    const activeCode = queryParams.get('activeCode')
    // console.log('activeCode: ', activeCode);
    useEffect(() => {
        dispatch(active_stripe_connect_account(activeCode))
    }, [activeCode])
    const redirect = () => {
        dispatch(messageClear())
        navigate('/')
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
            {
                loader ? <HashLoader /> : errorMessage ? <>
                    {/* <img src={error} alt="" /> */}
                    <button onClick={redirect} className='px-5 py-2 bg-green-500 rounded-sm text-white'>Back to Dashboard</button>
                </> : successMessage && <>
                    {/* <img src={success} alt="" /> */}
                    <button onClick={redirect} className='px-5 py-2 bg-green-500 rounded-sm text-white'>Back to Dashboard</button>
                </>
            }
        </div>
    )
}

export default Success