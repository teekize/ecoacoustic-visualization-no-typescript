"use client"
import React from 'react'
import Link from 'next/link'

const SideBar = () => {
    const lables ={
        1:"Main",
        2:"Analyze",
        3:"Custom Spectogram"
    }
    const links={
        1:"/",
        2:"/sound/main",
        3:"/sound/custom"

    }
  return (
    <div className='min-h-screen bg-[#316459] w-[20%] -mt-1 rounded-xl '>
        <div className=''>
        {[1,2,3].map(num=><Link href={links[num]} className='' key={num}><div className='mt-4  ml-2 w-[90%] text-center py-2 rounded-lg bg-[#F9B572]'>{lables[num]}</div></Link>)}
        </div>
        </div>
  )
}

export default SideBar