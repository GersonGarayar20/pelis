import { useState, useEffect, useRef } from 'react'
import HeaderCard from './HeaderCard';
import {images} from './image-data';

export default function Carrusel() {

  const [x, setX] = useState(0)

  const carrusel = useRef<HTMLDivElement>(null)

  const handleLeft = () =>{

    if (carrusel.current) {
      const index = carrusel.current.children.length -1
      const ultimoElemento = carrusel.current.children[index]
      carrusel.current.style.opacity = "0"

      setTimeout(() => {
        if (carrusel.current) {
          carrusel.current.insertBefore(ultimoElemento, carrusel.current.firstChild)
          carrusel.current.style.opacity = "1"
        }
      }, 200);

    }
  }
  
  const handleRight = () => {
    
    if (carrusel.current) {
      const primerElemento = carrusel.current.children[0]
      carrusel.current.style.opacity = "0"

      setTimeout(() => {
        if (carrusel.current) {
          carrusel.current.appendChild(primerElemento)
          carrusel.current.style.opacity = "1"
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
    <div className='bg-black relative overflow-hidden' style={{height: "80vh"}}>
      <div className='flex flex-wrap flex-col' ref={carrusel} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{
        transition: "all .2s"
      }}>
        <HeaderCard img={images[0]} />
        <HeaderCard img={images[1]} />
        <HeaderCard img={images[2]} />
      </div>
      <button className='text-white bg-slate-500 opacity-0 hover:opacity-100 transition-all absolute left-0 top-0 bottom-0' onClick={handleLeft}>anterior</button>
      <button className='text-white bg-slate-500 opacity-0 hover:opacity-100 transition-all absolute right-0 top-0 bottom-0' onClick={handleRight}>siguiente</button>
    </div>
    
  )
}
