import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'
import React from 'react'
import Footer from './Components/Footer'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar variant = "full"/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default App
