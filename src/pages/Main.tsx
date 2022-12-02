import React from 'react'
import CardPelicula from '../components/CardPelicula'
import CarruselPeliculas from '../components/CarruselPeliculas'

export default function Main() {
  return (
    <div className='pl-20'>
      <CarruselPeliculas h="10" titulo="Continue watching">
        <CardPelicula/>
        <CardPelicula/>
        <CardPelicula/>
        <CardPelicula/>
        <CardPelicula/>
      </CarruselPeliculas>
      <CarruselPeliculas h="20" titulo="Originales">
        <CardPelicula/>
        <CardPelicula/>
        <CardPelicula/>
        <CardPelicula/>
      </CarruselPeliculas>
    </div>
  )
}
