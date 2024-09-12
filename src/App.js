import React, { useState } from 'react'
import Landing from './pages/Landing'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import './App.css'
import AddFlower from './pages/AddFlower.jsx'
import ListFlowers from './pages/ListFlowers.jsx'
import ListOrders from './pages/ListOrders.jsx'
import Orders from './pages/Orders.jsx'
import Bars from './components/icons/Bars.jsx'
import XIcon from './components/icons/XIcon.jsx'

export const url = 'https://milehighserv.onrender.com'
export const localUrl = 'http://localhost:4000'
const App = () => {
  function openMenu() {
    document.body.classList += " menu--open";
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
  }
  return (
    <div>
      <Router>
        <div className="app">
          <div className='nav__bar'>
           <ul className="mobile__links">
            <div onClick={closeMenu}>
            <XIcon />
            </div>
            <li className='mobile__link' onClick={closeMenu}>
              <Link to="/addflower" >Add Flower</Link>
            </li>
            <li className='mobile__link' onClick={closeMenu}>
              <Link to="/listflower">List Flower</Link>
            </li>
            <li className='mobile__link' onClick={closeMenu}>
              <Link to="/listorders">List Orders</Link>
            </li>
          </ul>
            :
            <div onClick={openMenu} className='bars__wrapper'>
            <Bars />
            </div>
        </div>



          <div className='components'>

            <Sidebar />
            <div className='main'>
              <div className='filler'></div>
              <Routes>
                <Route path='/' key="_index" element={<Landing />} />
                <Route path='/addflower' element={<AddFlower />} />
                <Route path='/listflower' element={<ListFlowers />} />
                <Route path='/listorders' element={<ListOrders />} />
                <Route path='/listorders/:index' key="_index" element={<Orders />} />
              </Routes>
            </div>
          </div>

        </div>
      </Router>

    </div>
  )
}

export default App
