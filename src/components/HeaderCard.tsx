import React from 'react'

export default function HeaderCard({img}:any) {
  console.log(img)
  return (
    <div className='relative bg-blue-400 w-full h-full'>
      <div className='absolute ring-offset-0'>
        <img className='w-full' src={img} alt="" />
      </div>
      <div className='absolute'>
        <button className='bg-white p-2 rounded-xl text-lg'>More details</button>
      </div>
    </div>
  )
}
