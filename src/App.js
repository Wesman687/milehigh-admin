import React from 'react'
import Landing from './pages/Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Sidebar from './components/Sidebar'
import './App.css'
import AddFlower from './pages/AddFlower.jsx'
import ListFlowers from './pages/ListFlowers.jsx'
import AddAccessory from './pages/AddAccessory.jsx'
import ListAccessory from './pages/ListAccessory.jsx'


export const url = 'https://milehighserv.onrender.com'
const App = () => {
  return (
    <div>
      <Router>
    <div className="App">      
      <Nav />
      
      <div className='components'>
      <Sidebar />      
      <div className='main'>
      <div className='filler'></div>      
      <Routes>
        <Route path='/' key="_index"  element={<Landing /> }/>
        <Route path='/addflower' element={ <AddFlower /> } />
        <Route path='/listflower' element= { <ListFlowers />} />
        <Route path='/addaccessory' element= { <AddAccessory />} />
        <Route path='/listaccessory' element={ <ListAccessory />} />
      </Routes>
      </div>
      </div>
      
    </div>
    </Router>
      
    </div>
  )
}

export default App
