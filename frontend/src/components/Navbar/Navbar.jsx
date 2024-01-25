import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from "../Assets/logo.png"
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'

const Navbar = () => {

  const [menu , setMenu] = useState("shop")
  const {getTotalCartItem} = useContext(ShopContext)

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt=''/>
        <p>SHOPPER </p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link to='/' style={{textDecoration:'none'}}>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("men")}}><Link to='/mens' style={{textDecoration:'none'}}>Men</Link>{menu==="men"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("women")}}><Link to='/womens' style={{textDecoration:'none'}}>Women</Link>{menu==="women"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link to='/kids' style={{textDecoration:'none'}}>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?
        <button 
        onClick = {()=> {localStorage.removeItem('auth-token');
        window.location.replace('/')}}>Logout</button>
        :
        <Link to='/login'><button>Login</button></Link>
        }
        
        <Link to='/cart'><img src={cart_icon} alt=""/></Link>
        <div className="nav-cart-count">
          {getTotalCartItem()}
        </div>
      </div>
      
    </div>
  )
}

export default Navbar
