import React from 'react'

const Profile = () => {
  return (
    <div>
      <button  onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/");}}>LOGOUT</button>
      
    </div>
  )
}

export default Profile
