import React from 'react'

const Class = () => {
  return (
    <div>
        <div className='  p-[10px] m-[20px] rounded-lg shadow-lg w-[300px] '>
            <ul>
                <li className='hover:underline w-1/2 ' style={{cursor:'pointer',transition:'0.5s'}}>
                    <p>العاب المغامرة</p>
                </li>
                <li className='hover:underline w-1/2 ' style={{cursor:'pointer',transition:'0.5s'}}>
                    <p>العاب الاكشن</p>
                </li>
                <li className='hover:underline w-1/2 ' style={{cursor:'pointer',transition:'0.5s'}}>
                    <p>العاب السيارات</p>
                </li>
                <li className='hover:underline w-1/2 ' style={{cursor:'pointer',transition:'0.5s'}}>
                    <p>العاب التصويب</p>
                </li>
                <li className='hover:underline w-1/2 ' style={{cursor:'pointer',transition:'0.5s'}}>
                    <p>العاب الاون لاين</p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Class