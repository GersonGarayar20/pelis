import { useState } from 'react'
import Carrusel from './components/Carrusel'
import Nav from './components/Nav'
import TabBar from './components/TabBar'
import Main from './pages/Main'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=''>
      <TabBar />
      <div className='relative'>
        <Carrusel />
        <Nav/>
      </div>
      <Main />
    </div>
  )
}

export default App
