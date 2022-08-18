import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import CartOverlay from './CartOverlay';
import {CURRENCY} from '../queries/graphqlQueries';
import { useQuery } from '@apollo/client';
import currencyContext from '../context/CurrencyContext'
import {basketContext} from '../context/BasketContext'


function Header() {

  const {data} = useQuery(CURRENCY)

  const [open, setOpen] = useState({
    currencyDropdown: false,
    cartOverlay: false,
  });

  const {totalQuantity} = useContext(basketContext);
  
  const {currency, setCurrency} = useContext(currencyContext);
  const selectedCurrency = data?.currencies.find(_currency => _currency.label === currency);

  const dropDown = (e)=>{
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
            <small id="currencies" onClick={dropDown} className="header_currency" >{selectedCurrency?.symbol}</small>
            { open.currencyDropdown &&
              <ul className="list absolute currency_list_position anime">
                { data?.currencies.map(currency =>{
                  return (
                    <li onClick={()=> setCurrency(currency.label)} key={currency.label} id={currency.label} className="currency_list">{currency.symbol} {currency.label}</li>
                  )
                })

                }
              </ul>
            }
          </div>
          <div className="relative">
            { totalQuantity > 0 &&
              <div className="absolute qty_badge">
                {totalQuantity}
              </div>
            }
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