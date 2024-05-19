import React, { useState, useEffect } from 'react'
import coin from '../Assets/coin.png'
import './css/Shop.css'
import Item from '../components/Item/Item'
const Shop = (props) => {

  const [allproducts, setAllProducts] = useState([]);
  const [coins, setcoins] = useState([])


  const fetchInfo = () => { 
    fetch('http://localhost:4000/allgifts') 
            .then((res) => res.json()) 
            .then((data) => setAllProducts(data))
    }

    fetch('http://localhost:4000/user-info', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify(),
    })
    .then((resp) => resp.json()) 
    .then((data) => {setcoins(data.coins)})

    useEffect(() => {
      fetchInfo();
    }, [])

  return (
    <div className='main'>
        {localStorage.getItem('auth-token') &&
        <div className='coin-counter'>
            <img src={coin} alt="" />
            <h1>${coins}</h1>
        </div> 
        }

        <div className='shopcategory-products-container'>
          <div className="shopcategory-products">
            {allproducts.map((item,i)=>{
              return <Item key={i} id={item.id} name={item.name} image={item.image} coins={item.coins}/>
            })}
          </div>
        </div>
     </div>
  )
}

export default Shop
