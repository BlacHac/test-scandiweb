import React, { useContext } from 'react'
import CartProductCard from './Cart_ProductCard'
import {Link} from 'react-router-dom';
import {basketContext} from '../context/BasketContext';
import currencyContext from '../context/CurrencyContext';

function CartOverlay() {

  const {basket, totalQuantity} = useContext(basketContext);
  const {currency} = useContext(currencyContext)

  if (totalQuantity === 0) {
    return <div className='absolute cartOverlay d-flex column align-center'>
            <h3 className="emptyCart_title">Empty Cart</h3>
            <img className="emptyCart_image" src="../images/empty_cart.jpeg" alt="No Item Cart" /> 
          </div>
  } 

  let currency_symbol = '';
  const total_eachItem = basket.map(_product => {
    return _product.price.map(_price => {
      if(_price.currency.label === currency){
        currency_symbol = _price.currency.symbol
        return _price.amount * _product.qty
      }
    }).find(_item => _item)
  });
  
  let total_final = 0;
    total_eachItem.forEach(_item => total_final += _item)
  
  return (
    <div className='absolute cartOverlay'>
        <p className='cartOverlay_padding'><span className='bold'>My Bag, </span><span>{totalQuantity}</span><span> item{totalQuantity != 1 && "s"}</span></p>
        {
          basket.map(_product => {
            return <CartProductCard key={_product.id} id={_product.id} chosenAttributes={_product.chosenAttributes}
            name={_product.name} brand={_product.brand} image={_product.image} price ={_product.price}
            attributes={_product.attributes} qty={_product.qty}
            />
          })
        }
        <div className="d-flex space-between cartOverlay_padding bold">
          <p>Total</p>
          <p><span>{currency_symbol}</span>{total_final.toFixed(2)}</p>
        </div>
        <div className='cartOverlay_padding d-flex space-evenly'>
          <Link to="/cart">
            <button className='cartOverlay_btn bold'>View Bag</button>
          </Link>
          <button className='cartOverlay_btn bold btn_checkout'>Check Out</button>
        </div>
    </div>
  )
}

export default CartOverlay