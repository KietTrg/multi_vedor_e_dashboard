import React, { forwardRef } from 'react'
import { FixedSizeList as List } from 'react-window'
function handleOnWheel({ deltaY }) {
    console.log('handleOnWheel: ', deltaY);

}
const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props}></div>
))
const Payments = () => {
    const Row = ({ index, style }) => {
        return (
            <div style={style} className='flex text-sm'>
                <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>#5778</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <span className='py-[1px] px-[5px] text-emerald-700 '>pending</span>
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>10 july 2023</div>

            </div>
        )
    }
    return (
        <div className='px-2 md:px-7 py-5'>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5'>
                <div className='flex justify-between items-center p-5 shadow-md bg-white rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#2B2A4C]'>
                        <h2 className='text-3xl font-bold'>6665đ</h2>
                        <span className='text-md font-medium'>Total Sale</span>
                    </div>
                    <div className='w-[54px] h-[54px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl'>
                        <span className='text-[#28c76f]'>VNĐ</span>
                    </div>
                </div>
                <div className='flex justify-between items-center p-5 shadow-md bg-white rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#2B2A4C]'>
                        <h2 className='text-3xl font-bold'>65</h2>
                        <span className='text-md font-medium'>Available Amount</span>
                    </div>
                    <div className='w-[54px] h-[54px] rounded-full bg-[#e000e81f] flex justify-center items-center text-xl'>
                        <span className='text-[#cd00e8]'>VNĐ</span>
                    </div>
                </div>
                <div className='flex justify-between items-center p-5 shadow-md bg-white rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#2B2A4C]'>
                        <h2 className='text-3xl font-bold'>30</h2>
                        <span className='text-md font-medium'>Withdrawal Amount</span>
                    </div>
                    <div className='w-[54px] h-[54px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl'>
                        <span className='text-[#00cfe8]'>VNĐ</span>
                    </div>
                </div>
                <div className='flex justify-between items-center p-5 shadow-md bg-white rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#2B2A4C]'>
                        <h2 className='text-3xl font-bold'>665</h2>
                        <span className='text-md font-medium'>Pending Amount</span>
                    </div>
                    <div className='w-[54px] h-[54px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl'>
                        <span className='text-[#7367f0]'>VNĐ</span>

                    </div>
                </div>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 pb-4 gap-7'>
                <div className='p-5 shadow-md bg-white rounded-md'>
                    <h2 className='text-[#2a2b4c] font-semibold text-lg'>Send Request</h2>
                    <div className='py-5'>
                        <form>
                            <div className='flex gap-3 flex-wrap'>
                                <input className=' md:w-[79%] px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2a2b4c] focus:border-[#FF494C] overflow-hidden '
                                    type="number" min='0' name='amount' />
                                <button className=' transition-all duration-500 bg-[#1D976C]  px-4 py-2 rounded-md  text-white hover:bg-[#0f6647]'>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h2 className='text-[#2a2b4c] font-semibold text-lg'>Pending request</h2>
                        <div className='w-full overflow-x-auto'>
                            <div className='flex bg-[#ffe7e7] uppercase text-xs min-w-[340px]'>
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

                <div className='p-5 shadow-md bg-white rounded-md'>
                    <div>
                        <h2 className='text-[#2a2b4c] font-semibold text-lg pb-4'>Success Widrawal</h2>
                        <div className='w-full overflow-x-auto'>
                            <div className='flex bg-[#ffe7e7] uppercase text-xs min-w-[340px]'>
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
        </div>

    )
}

export default Payments