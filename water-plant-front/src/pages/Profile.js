import React, { useContext } from 'react'
import profile from '../Assets/profile copy.png'
import './css/profile.css'
import { ShopContext } from '../context/context'

const Profile = (props) => {
  const {userInfo} = useContext(ShopContext)

  return (
    <div className='background'>
      <div className='Header'>
        <img src = {profile} alt = "" />
        <p1>{userInfo.name}</p1>
      </div>
    <div className='email'>
      Email: <div className='box-style'>
        {userInfo.email}
      </div>
    </div>
    <div className='coins'>
      Coins: <div className='coins-number'>
        {userInfo.coins}
      </div>
    </div>

    <div className='crypto-key'>
      CryptoKey: <div className='box-style-1'>
        {userInfo.cryptokey}
      </div>
    </div>
    <button  onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/");}}>LOGOUT</button>
      
  </div>
  )
}

export default Profile
