import { useState, useEffect, useRef } from 'react'

export default function CarruselPeliculas({titulo, h, children}: any) {
  const [x, setX] = useState(0)

  const carrusel = useRef<HTMLDivElement>(null)


  const handleLeft = () =>{

    if (carrusel.current) {
      const index = carrusel.current.children.length -1
      const ultimoElemento = carrusel.current.children[index]
      carrusel.current.insertBefore(ultimoElemento, carrusel.current.firstChild)
      
      carrusel.current.style.transition = "none",
      carrusel.current.style.transform = "translateX(-256px)"
      
      setTimeout(() => {
        if (carrusel.current) {
          carrusel.current.style.transition = "all .2s",
          carrusel.current.style.transform = "translateX(0)"
        }
      }, 0);

    }
  }
  
  const handleRight = () => {
    
    if (carrusel.current) {
      const primerElemento = carrusel.current.children[0]
      carrusel.current.style.transition = "all .2s",
      carrusel.current.style.transform = "translateX(-256px)"
      
      setTimeout(() => {
        if (carrusel.current) {
          carrusel.current.appendChild(primerElemento)
          carrusel.current.style.transition = "none",
          carrusel.current.style.transform = "translateX(0)"
        }
      }, 200);
    }
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setX(e.changedTouches[0].screenX)
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.changedTouches[0].screenX;

    if (currentX < x) {
      handleRight();
    } else {
      handleLeft();
    }
  }

  return (
    <div className='bg-black'>
    <h2 className='text-white text-lg font-bold py-2'>{titulo}</h2>
    <div className='overflow-hidden relative'>
      <div className='flex flex-wrap gap-4 flex-col' ref={carrusel} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
      style={{
        height:`${h}rem`
      }}>
        {children}
      </div>
      <button className='text-white bg-slate-500 opacity-0 hover:opacity-100 transition-all absolute left-0 top-0 bottom-0' onClick={handleLeft}>anterior</button>
      <button className='text-white bg-slate-500 opacity-0 hover:opacity-100 transition-all absolute right-0 top-0 bottom-0' onClick={handleRight}>siguiente</button>
    </div>
    </div>
    
  )
}
