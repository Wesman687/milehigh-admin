import React from 'react'
import Landing from './pages/Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import './App.css'
import AddFlower from './pages/AddFlower.jsx'
import ListFlowers from './pages/ListFlowers.jsx'
import ListOrders from './pages/ListOrders.jsx'

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
      </Routes>
      </div>
      </div>
      
    </div>
    </Router>
      
    </div>
  )
}

export default App
