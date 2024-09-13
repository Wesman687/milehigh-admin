import React, { useEffect, useState } from 'react'
import Landing from './pages/Landing'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import './App.css'
import AddFlower from './pages/AddFlower.jsx'
import ListFlowers from './pages/ListFlowers.jsx'
import ListOrders from './pages/ListOrders.jsx'
import Orders from './pages/Orders.jsx'
import NavBar from './components/NavBar.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


export const url = 'https://milehighserv.onrender.com'
export const localUrl = 'http://localhost:4000'
const App = () => {  
  const [pathname, setPathName] = useState("");
  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);
  return (
    <div>
      <Router>
        <div className="app">
          <NavBar pathname={pathname} setPathName={setPathName} />


          <div className='components'>

            <Sidebar pathname={pathname} setPathName={setPathName} />
            <div className='main'>
              <div className='filler'></div>
              <ToastContainer theme='dark' />
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
