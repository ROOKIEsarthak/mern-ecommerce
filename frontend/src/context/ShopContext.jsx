import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext(null);

    const getDefaultCart=()=>{

        let cart = {}
        for (let index = 0; index < 300+1; index++) {
            cart[index] = 0;
            
        }
        return cart;
    }

const ShopContextProvider =(props)=>{

    const [all_product , setAll_Product] = useState([]);

    const [cartItems , setCartItems] = useState(getDefaultCart())
        
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))
        .catch((error) => console.error("Error fetching products:", error));

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:"POST",
                headers:{
                    Accept:'Application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'content-type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }

    },[])

    
    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        //console.log(cartItems);
        if(localStorage.getItem('auth-token'))
        {
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'content-type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }

    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token'))
        {
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'content-type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }

    const getTotalCartAmount =()=>{
        let totalAmount = 0;
        if (all_product.length > 0)
        {
        
        for(const item in cartItems)
        {
            console.log(cartItems)
            if(item > 0)
            {
                console.log(cartItems[item])
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                if(itemInfo)
                {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
                
            }
        }
    }
        return totalAmount;
    }

    const getTotalCartItem = ()=>{
        let totalItem = 0;
        for (const items in cartItems)
        {
            if(cartItems[items]>0)
            {
                totalItem += cartItems[items]
            }
        }  
        return totalItem;
    }
    



    const contextValue = { getTotalCartItem,all_product , cartItems , addToCart , removeFromCart , getTotalCartAmount};
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider