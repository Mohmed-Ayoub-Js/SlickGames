import React from 'react'
const Search = () => {
  return (
    <div>
        <div>
        <div className=' p-[10px] m-[20px] rounded-lg shadow-lg w-[300px]'>
            <h1>
                البحث
            </h1>
            <div>
            <input className='p-[2px] rounded-sm shadow-xl text-black border-r-4 border-indigo-50' name="text" placeholder="Search..." type="search" />
            </div>
        </div>
    </div>
    </div>
  )
}

export default Search