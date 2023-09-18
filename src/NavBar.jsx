import React, { useState } from 'react';
import "./NavBar.css"
import { Link, useNavigate } from "react-router-dom"

function NavBar() {

  return (
    <div className='navBarContainer'>
      <h1 id='header'>stuidy</h1>
      <nav className='navBar'>
        <ul>
          <li> <Link id='link' >Home</Link></li>
          <li><Link id='link'>Assignment Managment</Link></li>
          <li> <Link id='link'>Calendar</Link></li>
          <li> <Link id='link'>Profile</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar;