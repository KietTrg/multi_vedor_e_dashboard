import React from 'react'
import { BsChevronBarLeft, BsChevronBarRight } from 'react-icons/bs'

const Pagination = ({ pageNumber, setPageNumber, totalItem, parPage, showItem }) => {
    let totalPage = Math.ceil(totalItem / parPage)
    let startPage = pageNumber

    let dif = totalPage - pageNumber

    if (dif <= showItem) {
        startPage = totalPage - showItem
    }
    let endPage = startPage < 0 ? showItem : showItem + startPage

    if (startPage <= 0) {
        startPage = 1
    }

    const createBtn = () => {
        const btns = []
        for (let i = startPage; i < endPage; i++) {
            btns.push(
                <li onClick={() => setPageNumber(i)} className={`${pageNumber === i ? ' shadow-md bg-[#FF494C] text-white' : 'bg-[#ffe7e7] text-[#2B2A4C] hover:bg-[#FF494C] hover:text-white  transition-all'} w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}>
                    {i}
                </li>
            )
        }
        return btns
    }
    return (
        <ul className='flex gap-3'>
            {
                pageNumber > 1 && <li onClick={() => setPageNumber(pageNumber - 1)} className=' cursor-pointer w-[33px] h-[33px] rounded-full justify-center items-center flex bg-[#ffe7e7] text-[#2B2A4C]'>
                    <BsChevronBarLeft />
                </li>
            }
            {
                createBtn()
            }
            {
                pageNumber < totalPage && <li onClick={() => setPageNumber(pageNumber + 1)} className=' cursor-pointer w-[33px] h-[33px] rounded-full justify-center items-center flex bg-[#ffe7e7] text-[#2B2A4C]'>
                    <BsChevronBarRight />
                </li>
            }
        </ul>
    )
}


export default Pagination