import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function Header() {

  const [open, setOpen] = useState(false);

  return (

    <header>
      <div className="container d-flex space-between">
        <ul className="list d-flex">
          <li className="Nav_list_items">women</li>
          <li className="Nav_list_items">men</li>
          <li className="Nav_list_items">kids</li>
        </ul>
        <Link to='/'>
          <img className="logo" src="../images/logo.png" alt="logo" />
        </Link>
        <div className="d-flex">
          <div onClick={()=>setOpen(!open)} className="header_currency bold relative">
            <small>$</small>
            { open &&
              <ul className="list absolute currency_list_position">
                <li className="currency_list">$ USD</li>
                <li className="currency_list">$ USD</li>
                <li className="currency_list">$ USD</li>
              </ul>
            }
          </div>
          <img className="header_cart" src="../images/cart.svg" />
        </div>
      </div>
      
    </header>






  )
}

export default Header


{/*
            
*/}