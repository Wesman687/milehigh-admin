import React from 'react'
import Landing from './pages/Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import './App.css'
import AddFlower from './pages/AddFlower.jsx'
import ListFlowers from './pages/ListFlowers.jsx'
import ListOrders from './pages/ListOrders.jsx'
import Orders from './pages/Orders.jsx'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

export const url = 'https://milehighserv.onrender.com'
export const localUrl = 'http://localhost:4000'
const App = () => {
  
  
  

  return (
    <div>
      <Router>
    <div className="App">      
      
      <div className='components'>
      <Sidebar />      
      <div className='main'>
      <div className='filler'></div>      
      <Routes>
        <Route path='/' key="_index"  element={<Landing /> }/>
        <Route path='/addflower' element={ <AddFlower /> } />
        <Route path='/listflower' element= { <ListFlowers />} />
        <Route path='/listorders' element = { <ListOrders />} />
        <Route path='/listorders/:index' key="_index" element = { <Orders /> } />
      </Routes>
      </div>
      </div>
      
    </div>
    </Router>
      
    </div>
  )
}

export default App
