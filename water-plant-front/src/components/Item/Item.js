import React from 'react'
import './Item.css'

const Item = (props) => {
  return (
    <div className='item'>
        <img src={props.image} alt="" />
        <p>{props.name}</p>
       <div className='price'>
        <button>BUY</button>
        <p1>${props.coins}</p1>
       </div>
        
    </div>
  )
}

export default Item
