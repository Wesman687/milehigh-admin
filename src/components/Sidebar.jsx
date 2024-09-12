import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const [pathname, setPathName] = useState("");
  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);
  return (
    <div className='sb__container'>
      
      <ul className="sb__links">
        <li onClick={()=>setPathName('/addflower')} className={(pathname === '/addflower') ? 'active' : 'sb__link'}>
        <Link to="/addflower" >Add Flower</Link>
        </li>
        <li onClick={()=>setPathName('/listflower')} className={(pathname === '/listflower') ? 'active' : 'sb__link'}>
        <Link to="/listflower">List Flower</Link>
        </li>
        <li onClick={()=>setPathName('/listorders')} className={(pathname === '/listorders') ? 'active' : 'sb__link'}>
        <Link to="/listorders">List Orders</Link>
        </li>       
      </ul>
    </div>
  )
}

export default Sidebar
