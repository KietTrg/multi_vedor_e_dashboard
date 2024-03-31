import React, { forwardRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatMoney } from '../../store/helpers'
import { FixedSizeList as List } from 'react-window'
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { toast } from 'react-hot-toast'
import { HashLoader } from 'react-spinners'
import moment from 'moment'
import { get_seller_payment_details, messageClear, send_withdrawal_request } from '../../store/Reducers/paymentReducer';
function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel: ', deltaY);

}
const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props}></div>
))
const Payments = () => {
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(0)
    const { userInfo } = useSelector(state => state.auth)
    const { total_sale,
        withdrawal_amount,
        pending_amount,
        available_amount,
        successMessage,
        errorMessage,
        loader,
        pending_withdrawals,
        success_withdrawals } = useSelector(state => state.payment)
    const Row = ({ index, style }) => {
        return (
            <div style={style} className='flex text-sm'>
                <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>{formatMoney(pending_withdrawals[index]?.amount)}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] text-emerald-700 '>{pending_withdrawals[index]?.status}</span>
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>{moment(pending_withdrawals[index]?.createAt).format("DD/MM/YYYY")}</div>

            </div>
        )
    }
    useEffect(() => {
        dispatch(get_seller_payment_details(userInfo._id))
    }, [])
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
    const sendRequest = (e) => {
        //check dk
        e.preventDefault()
        console.log('e.preventDefault(): ', amount);
        dispatch(send_withdrawal_request({ amount, sellerId: userInfo._id }))
        setAmount(0)
    }
    const RowSuccess = ({ index, style }) => {
        return (
            <div style={style} className='flex text-sm'>
                <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>{formatMoney(success_withdrawals[index]?.amount)}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] text-emerald-700 '>{success_withdrawals[index]?.status}</span>
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>{moment(success_withdrawals[index]?.createAt).format("DD/MM/YYYY")}</div>

            </div>
        )
    }
    return (
        <div className='px-2 md:px-7 py-5'>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5'>
                <div className='flex justify-between items-center p-5 shadow-md bg-white rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#2B2A4C]'>
                        <h2 className='text-3xl font-bold'>{formatMoney(total_sale)}đ</h2>
                        <span className='text-md font-medium'>Total Sales</span>
                    </div>
                    <div className='w-[54px] h-[54px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl'>
                        <LiaMoneyBillWaveAltSolid size={25} className='text-[#28c76f]'></LiaMoneyBillWaveAltSolid>
                    </div>
                </div>
                <div className='flex justify-between items-center p-5 shadow-md bg-white rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#2B2A4C]'>
                        <h2 className='text-3xl font-bold'>{formatMoney(available_amount)}đ</h2>
                        <span className='text-md font-medium'>Available Amount</span>
                    </div>
                    <div className='w-[54px] h-[54px] rounded-full bg-[#e000e81f] flex justify-center items-center text-xl'>
                        <LiaMoneyBillWaveAltSolid size={25} className='text-[#cd00e8]'></LiaMoneyBillWaveAltSolid>
                    </div>
                </div>
                <div className='flex justify-between items-center p-5 shadow-md bg-white rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#2B2A4C]'>
                        <h2 className='text-3xl font-bold'>{formatMoney(withdrawal_amount)}đ</h2>
                        <span className='text-md font-medium'>Withdrawal Amount</span>
                    </div>
                    <div className='w-[54px] h-[54px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl'>
                        <LiaMoneyBillWaveAltSolid size={25} className='text-[#00cfe8]'></LiaMoneyBillWaveAltSolid>
                    </div>
                </div>
                <div className='flex justify-between items-center p-5 shadow-md bg-white rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#2B2A4C]'>
                        <h2 className='text-3xl font-bold'>{formatMoney(pending_amount)}đ</h2>
                        <span className='text-md font-medium'>Pending Amount</span>
                    </div>
                    <div className='w-[54px] h-[54px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl'>
                        <LiaMoneyBillWaveAltSolid size={25} className='text-[#7367f0]'></LiaMoneyBillWaveAltSolid>

                    </div>
                </div>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 pb-4 gap-7'>
                <div className='p-5 shadow-md bg-white rounded-md'>
                    <h2 className='text-[#2a2b4c] font-semibold text-lg'>Send Withdrawal Request</h2>
                    <div className='py-5'>
                        <form onSubmit={sendRequest}>
                            <div className='flex gap-3 flex-wrap'>
                                <input onChange={(e) => setAmount(e.target.value)} required value={amount} className=' md:w-[79%] px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-green-500 overflow-hidden '
                                    type="number" min='0' name='amount' />
                                <button disabled={loader} className=' transition-all duration-500 bg-[#739072]  px-4 py-2 rounded-md  text-white hover:bg-[#3a4d39]'>{loader ? <HashLoader></HashLoader> : 'Send'}</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h2 className='text-[#2a2b4c] font-semibold text-lg pb-4'>Pending request</h2>
                        <div className='w-full overflow-x-auto'>
                            <div className='flex bg-[#D0E7D2] uppercase text-xs min-w-[340px] rounded-md'>
                                <div className='w-[25%] p-2'>No</div>
                                <div className='w-[25%] p-2'>Amount</div>
                                <div className='w-[25%] p-2'>Status</div>
                                <div className='w-[25%] p-2'>Date</div>

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

                <div className='p-5 shadow-md bg-white rounded-md'>
                    <div>
                        <h2 className='text-[#2a2b4c] font-semibold text-lg pb-4'>Success Withdrawal</h2>
                        <div className='w-full overflow-x-auto'>
                            <div className='flex bg-[#D0E7D2] uppercase text-xs min-w-[340px] rounded-md'>
                                <div className='w-[25%] p-2'>No</div>
                                <div className='w-[25%] p-2'>Amount</div>
                                <div className='w-[25%] p-2'>Status</div>
                                <div className='w-[25%] p-2'>Date</div>

                            </div>
                            {
                                <List
                                    style={{ minWidth: '340px', overflowX: 'hidden' }}
                                    className='List'
                                    height={350}
                                    itemCount={success_withdrawals.length}
                                    itemSize={35}
                                    outerElementType={outerElementType}
                                >
                                    {RowSuccess}
                                </List>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Payments