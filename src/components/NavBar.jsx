import React from 'react'
import XIcon from './icons/XIcon';
import Bars from './icons/Bars';
import { useNavigate } from 'react-router-dom';
import CubeIcon from './icons/CubeIcon';
import ListIcon from './icons/ListIcon';
import MoneyIcon from './icons/MoneyIcon';
import HomeIcon from './icons/HomeIcon';

export default function NavBar({pathname, setPathName}) {  
    const navigate = useNavigate()  
  function openMenu() {
    document.body.classList += " menu--open";
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
  }
  return (
    <div className='nav__bar'>
           <ul className="mobile__links">
            <div className="mobile__container">
            <div onClick={closeMenu}>
            <XIcon />
            </div>
            <div className={pathname === '/' ? 'mobile__active' : 'mobile__inactive'} onClick={()=>{
              closeMenu()
              setPathName('/')
              navigate('/')
            }}>
                <HomeIcon classes={'nav-icon'}/>
            Home
            </div>
            <div className={pathname === '/addflower' ? 'mobile__active' : 'mobile__inactive'} onClick={()=>{
              closeMenu()
              setPathName('/addflower')
              navigate('/addflower')
            }}>
                <CubeIcon classes={'nav-icon'}/>
            Add Product
            </div>
            <div className={pathname === '/listflower' ? 'mobile__active' : 'mobile__inactive'} onClick={()=>{
              closeMenu()
              setPathName('/listflower')
              navigate('/listflower')
            }}>            
            <ListIcon classes={'nav-icon'}/>
              List Product
            </div>
            <div className={pathname === '/listorders' ? 'mobile__active' : 'mobile__inactive'} onClick={()=>{
              closeMenu()
              setPathName('/listorders')
              navigate('/listorders')
            }}>
        <MoneyIcon classes={'nav-icon'} />            
              List Orders
            </div>
            </div>
          </ul>
            :
            <div onClick={openMenu} className='bars__wrapper'>
            <Bars />
            </div>
        </div>

  )
}
