import React from 'react'

const Search = ({ setParPage, searchValue, setSearchValue }) => {
    return (
        <div className='flex justify-between items-center'>
            <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-red-500 ouline-none bg-transparent border border-slate-700 rounded-md text-[#2B2A4C]'>
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="25">25</option>
            </select>
            <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#2B2A4C] focus:border-[#FF494C] overflow-hidden' type="text" name='search' placeholder='search' />
        </div>
    )
}

export default Search