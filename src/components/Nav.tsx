import React from 'react'

export default function Nav() {
  return (
    <div className='text-white h-40 absolute bottom-0 w-full flex gap-2 items-center justify-center bg-gradient-to-t from-black to-transparent'>
      <a className='px-4 py-2 hover:bg-white/20 bg-neutral-500/50 rounded-xl' href="">All</a>
      <a className='px-4 py-2 hover:bg-white/20 transition-all rounded-xl' href="">Movies</a>
      <a className='px-4 py-2 hover:bg-neutral-500/70 transition-all rounded-xl' href="">TV shows</a>
      <a className='px-4 py-2 hover:bg-neutral-500/70 transition-all rounded-xl' href="">Sports</a>
    </div>
  )
}
