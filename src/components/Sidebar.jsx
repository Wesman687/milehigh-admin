import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import ListIcon from './icons/ListIcon';
import MoneyIcon from './icons/MoneyIcon';
import CubeIcon from './icons/CubeIcon';

const Sidebar = ({setPathName, pathname}) => {
  const navigate = useNavigate()
  useEffect(() => {
    setPathName(window.location.pathname);
  }, []);
  return (
    <div className='sb__container'>
      
      <ul className="sb__links">
        <li onClick={()=>{
          setPathName('/addflower')
          navigate('/addflower')
        }} className={(pathname === '/addflower') ? 'active' : 'sb__link'}>
          <CubeIcon classes={'cube-icon'}/>
        Add Product
        </li>
        <li onClick={()=>{
          setPathName('/listflower')
          navigate('/listflower')
        }} className={(pathname === '/listflower') ? 'active' : 'sb__link'}>
          <ListIcon classes={'list-icon'}/>
        List Product
        </li>
        <li onClick={()=>{
          setPathName('/listorders')
          navigate('/listorders')
        }} className={(pathname === '/listorders') ? 'active' : 'sb__link'}>
          <MoneyIcon classes={'money-icon'} />
        List Orders
        </li>       
      </ul>
    </div>
  )
}

export default Sidebar
