import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import logo from '../../Assets/logo.png'
import giftbag from '../../Assets/giftbag copy.png'
import profile from '../../Assets/profile copy.png'

const Navbar = () => {

  return (
    <div className='Nav'>
        <Link to='/' style={{ textDecoration: 'none' }} className="nav-logo">
            <img src={logo} alt="logo" />
            <p>THIRSTY PLANT</p>
        </Link>
        <div className='cart'>
          <Link to='/shop'  style={{ textDecoration: 'none' }}><img src={giftbag} alt="shop" /></Link>
        </div>
        
        <div className="nav-login">
          {localStorage.getItem('auth-token') ?
          <Link to='/profile' style={{ textDecoration: 'none' }}><img style={{position : 'relative', height: '70px', width: '70px', left: '30px', top: '1px'}} src={profile} alt="profile" /></Link>:
          <Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>
          }
        </div>
    </div>
  )
}

export default Navbar
