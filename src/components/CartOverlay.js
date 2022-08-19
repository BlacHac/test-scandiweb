import React, { Component } from 'react'
import CartProductCard from './Cart_ProductCard'
import {Link} from 'react-router-dom';
import {dataLayer} from '../context/DataContext';

class CartOverlay extends Component{

  static contextType = dataLayer

 render(){

  const {basket, totalQuantity, selectedCurrency_symbol, subTotal} = this.context

  if (totalQuantity === 0) {
    return (
          <div className='absolute cartOverlay d-flex column align-center'>
            <h3 className="emptyCart_title">Empty Cart</h3>
            <img className="emptyCart_image" src="../images/empty_cart.jpeg" alt="No Item Cart" /> 
          </div>
    )
  } 

  return (
    <div className='absolute cartOverlay'>
        <p className='cartOverlay_padding'><span className='bold'>My Bag, </span><span>{totalQuantity}</span><span> item{totalQuantity != 1 && "s"}</span></p>
        {
          basket.map(_product => {
            return <CartProductCard key={_product.id+Object.values(_product.chosenAttributes)} id={_product.id} chosenAttributes={_product.chosenAttributes}
            name={_product.name} brand={_product.brand} image={_product.image} price ={_product.price}
            attributes={_product.attributes} qty={_product.qty}
            />
          })
        }
        <div className="d-flex space-between cartOverlay_padding bold">
          <p>Total</p>
          <p><span>{selectedCurrency_symbol}</span>{subTotal.toFixed(2)}</p>
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
}

export default CartOverlay