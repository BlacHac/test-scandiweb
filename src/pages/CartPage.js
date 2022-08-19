import React, { Component } from 'react'
import Header from '../components/Header';
import CartProductCard from '../components/Cart_ProductCard';
import {dataLayer} from '../context/DataContext';

class CartPage extends Component {

  static contextType = dataLayer

  render(){

    const {basket, currency, totalQuantity} = this.context

    let selectedCurrency_symbol = '';
    const total_eachItem = basket.map(_product => {
      return _product.price.map(_price => {
        if(_price.currency.label === currency){
          selectedCurrency_symbol = _price.currency.symbol
          return _price.amount * _product.qty
        }
      }).find(_item => _item)
    });
    
    let total_final = 0;
      total_eachItem.forEach(_item => total_final += _item)
  
    const tax = total_final * 21 /100 ;  
  
    if (totalQuantity === 0) {
      return  (
        <>
          <Header />
          <div className='container d-flex column align-center'>
            <h3 className="cart_title">Empty Cart</h3>
            <img className="emptyCart_image" src="../images/empty_cart.jpeg" alt="No Item Cart" /> 
          </div>
        </>
      )
    } 

    return (
      <>
          <Header />
          <section className='container'>
            { !totalQuantity &&
              <div>
                <h3 className="cart_title">Empty Cart</h3>
                <img className="emptyCart_image" src="../images/empty_cart.jpeg" alt="No Item Cart" /> 
              </div>
            }
              <h2 className='cart_title'>Cart</h2>
              {
                basket.map(_product => {
                  return <><hr/>
                          {<CartProductCard key={_product.id} id={_product.id} chosenAttributes={_product.chosenAttributes}
                            name={_product.name} brand={_product.brand} image={_product.image} price ={_product.price}
                            attributes={_product.attributes} qty={_product.qty} /> }
                          <hr/></>
                })
              }
              <div className="fCalc fontSize">
                  <p>Tax<span className='price tax'> 21%:</span><small className='bold'> {selectedCurrency_symbol}</small><span className='cart_item_price bold'>{tax.toFixed(2)}</span></p>
                  <p>Quantity:<span className='cart_item_price bold'> {totalQuantity}</span></p>
                  <p><span className='total'>Total:</span><small className='bold'> {selectedCurrency_symbol}</small><span className='cart_item_price bold'>{total_final.toFixed(2)}</span></p>
                  <button className='button-primary'>Order</button>
              </div>
          </section>
          
      </>
    )
  }
}

export default CartPage