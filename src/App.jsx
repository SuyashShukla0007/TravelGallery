import React from 'react'
import {Routes,Route, Router} from 'react-router-dom'
import Fade from './pages/fade/Fade'
import CoverFlow from  './pages/CoverFlow/CoverFlow'
import Home from './pages/Home/Home'
import Cube from './pages/cube/Cube'
import VelocityScroll from './pages/vellocity/VelocityScroll'
const App = () => {
  return (
   <Routes>
    <Route path='/' element={<Home/>}></Route>
   
   </Routes>
  )
}

export default App