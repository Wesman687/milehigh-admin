import React from 'react'
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sb__container'>
      
      <ul className="sb__links">
        <li className="sb__link">
        <Link to="/addflower">Add Flower</Link>
        </li>
        <li className="sb__link">
        <Link to="/listflower">List Flower</Link>
        </li>
        <li className="sb__link">
        <Link to="/listorders">List Orders</Link>
        </li>
        
       

      </ul>
    </div>
  )
}

export default Sidebar
