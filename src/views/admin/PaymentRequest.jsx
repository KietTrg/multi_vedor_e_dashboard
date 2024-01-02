import React, { forwardRef } from 'react'
import { FixedSizeList as List } from 'react-window'
function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel: ', deltaY);

}
const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props}></div>
))
const PaymentRequest = () => {


    const Row = ({ index, style }) => {
        return (
            <div style={style} className='flex text-sm'>
                <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>#5778</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] text-emerald-700 '>pending</span>
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>10 july 2023</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <button className=' text-center bg-emerald-700 px-3 py-[2px] cursor-pointer text-white rounded-md text-sm'>Confirm</button>
                </div>
            </div>
        )
    }
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white shadow-md rounded-md'>
                <h2 className='text-xl font-medium pb-5 text-[#2B2A4C]'>Withdrawl request</h2>
                <div className='w-full'>
                    <div className='w-full overflow-x-auto'>
                        <div className='flex bg-[#ffe7e7] uppercase text-xs min-w-[340px]'>
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
                                itemCount={10}
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