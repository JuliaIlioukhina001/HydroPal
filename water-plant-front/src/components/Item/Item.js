import React, { useContext } from 'react'
import './Item.css'
import { ShopContext } from "../../context/context";

const Item = (props) => {
  const {buyitems} = useContext( ShopContext );
  const {cartItems} = useContext( ShopContext );

  return (
    <div className='item'>
        <img src={props.image} alt="" />
        <p>{props.name}</p>
       <div className='price'>
        {cartItems[props.id] === 1 ? 
         <h1>PURCHASED</h1> :
         <button onClick={()=>{buyitems(props.id)}} >BUY</button>
        }
        {cartItems[props.id] === 1 ? <></> :
        <p1>${props.coins}</p1>}
       </div>

    </div>
  )
}

export default Item;