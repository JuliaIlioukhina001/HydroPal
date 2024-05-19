import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

  const [products,setProducts] = useState([]);
  
  const getDefaultCart = () => {
    let gift = {};
    for (let i = 0; i < 10; i++) {
      gift[i] = 0;
    }
    return gift;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [userInfo, setuserInfo] = useState({})


  useEffect(() => {
    fetch('http://localhost:4000/allgifts') 
          .then((res) => res.json()) 
          .then((data) => setProducts(data))

    if(localStorage.getItem("auth-token"))
    {
      fetch('http://localhost:4000/getgift', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify(),
    })
      .then((resp) => resp.json())
      .then((data) => {setCartItems(data)});
      }
      if(localStorage.getItem("auth-token")) 
      {
        fetch('http://localhost:4000/user-info', {
        method: 'POST',
        headers: {
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem("auth-token")}`,
          'Content-Type':'application/json',
        },
      })
      .then((resp) => resp.json()) 
      .then((data) => {setuserInfo(data)})
      }

}, [])
  
  const buyitems = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem("auth-token"))
    {
      fetch('http://localhost:4000/buy', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({"itemId":itemId}),
    })
      .then((resp) => resp.json())
      .then((data) => {console.log(data)});
    }
  };


  const contextValue = {products, cartItems, userInfo, buyitems};
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
