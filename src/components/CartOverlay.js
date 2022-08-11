import React from 'react'
import CartProductCard from './Cart_ProductCard'
import {Link} from "react-router-dom";

function CartOverlay() {
  return (
    <div className='absolute cartOverlay'>
        <p className='cartOverlay_padding'><span className='bold'>My Bag,</span><span> 3</span><span> items</span></p>
        <CartProductCard />
        <CartProductCard />
        <div className="d-flex space-between cartOverlay_padding bold">
          <p>Total</p>
          <p><span>$</span>200.00</p>
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