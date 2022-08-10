import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import CartOverlay from './CartOverlay';

function Header() {

  const [open, setOpen] = useState({
    currencyDropdown: false,
    cartOverlay: false,
  });

  const dropDown = (e)=>{
    console.log(e.target)
    if(e.target.id == 'currencies'){
      setOpen(prevOpen =>{
        return {
          ...prevOpen,
          currencyDropdown : !prevOpen.currencyDropdown
        }
      })
    }else {
      setOpen(prevOpen =>{
        return{
          ...prevOpen,
          cartOverlay : !prevOpen.cartOverlay
        }
      })
      }
    }

  return (

    <header>
      <div className="container d-flex align-center space-between">
        <ul className="list d-flex">
          <li className="Nav_list_items">women</li>
          <li className="Nav_list_items">men</li>
          <li className="Nav_list_items">kids</li>
        </ul>
        <Link to='/'>
          <img className="logo" src="../images/logo.png" alt="logo" />
        </Link>
        <div className="d-flex align-center">
          <div className="bold relative header_currency">
            <small id="currencies" onClick={dropDown} className="header_currency" >$</small>
            { open.currencyDropdown &&
              <ul className="list absolute currency_list_position">
                <li className="currency_list">$ USD</li>
                <li className="currency_list">$ USD</li>
                <li className="currency_list">$ USD</li>
              </ul>
            }
          </div>
          <div className="relative">
            <img onClick={dropDown} className="header_cart" src="../images/cart.svg" />
            { open.cartOverlay &&
              <CartOverlay />
            }
          </div>
        </div>
      </div>
      
    </header>






  )
}

export default Header


{/*
            
*/}