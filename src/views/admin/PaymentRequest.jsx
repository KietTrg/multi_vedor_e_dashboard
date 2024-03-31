import React, { forwardRef, useEffect, useState } from 'react'
import { FixedSizeList as List } from 'react-window'
import { toast } from 'react-hot-toast'
import { HashLoader } from 'react-spinners'
import moment from 'moment'
import { formatMoney } from '../../store/helpers'
import { confirm_payment_request, get_payment_request, get_seller_payment_details, messageClear, send_withdrawal_request } from '../../store/Reducers/paymentReducer';
import { useDispatch, useSelector } from 'react-redux'
function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel: ', deltaY);

}
const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props}></div>
))
const PaymentRequest = () => {
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(0)
    const [id, setId] = useState('')
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, errorMessage, loader, pending_withdrawals } = useSelector(state => state.payment)
    useEffect(() => {
        dispatch(get_payment_request())
    }, [])
    const confirm_request = (id) => {
        setId(id)
        dispatch(confirm_payment_request(id))
    }
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

    const Row = ({ index, style }) => {
        return (
            <div style={style} className='flex text-sm'>
                <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>{formatMoney(pending_withdrawals[index]?.amount)}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] text-emerald-700 '>{pending_withdrawals[index]?.status}</span>
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>{moment(pending_withdrawals[index]?.createAt).format("DD/MM/YYYY")}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <button disabled={loader} onClick={() => confirm_request(pending_withdrawals[index]?._id)} className=' transition-all duration-500 bg-[#739072]  px-4  rounded-md  text-white hover:bg-[#3a4d39]'>{(loader && id === pending_withdrawals[index]?._id) ? <HashLoader size={15} /> : 'Confirm'}</button>
                </div>
            </div>
        )
    }

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white shadow-md rounded-md'>
                <h2 className='text-xl font-medium pb-5 text-[#2B2A4C]'>Withdrawal request</h2>
                <div className='w-full'>
                    <div className='w-full overflow-x-auto'>
                        <div className='flex bg-[#D0E7D2] rounded-md font-medium uppercase text-xs min-w-[340px]'>
                            <div className='w-[25%] p-2'>No</div>
                            <div className='w-[25%] p-2'>Amount</div>
                            <div className='w-[25%] p-2'>Status</div>
                            <div className='w-[25%] p-2'>Date</div>
                            <div className='w-[25%] p-2'>Action</div>
                        </div>
                        {
                            <List
                                style={{ minWidth: '340px', overflowX: 'hidden' }}
                                className='List'
                                height={350}
                                itemCount={pending_withdrawals.length}
                                itemSize={35}
                                outerElementType={outerElementType}
                            >
                                {Row}
                            </List>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentRequest