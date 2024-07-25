import React, { useContext, useEffect, useState } from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout } from "../firebase/init";

const Nav = ({}) => {  
  const [signState, setSignState] = useState("Sign In")
  useEffect(() => {
    onAuthStateChanged(auth, async(user)=> {
      if (user) {
        setSignState("Sign Out")
      }
      else {
        setSignState("Sign In")
      }
    })
    
  }, [])
  function logoutNow(){
    logout()
    setSignState("Sign In")
  }
  console.log(signState)
  return (
    <div className="nav__container">
      <div className="logo__container">
        <h1 className="logo__text">MILE HIGH HEMP CO</h1>
      </div>

      <div className="nav__wrapper">
        <h1 className="logo__text">Admin Panel</h1>
      </div>
    </div>
  );
};

export default Nav;
