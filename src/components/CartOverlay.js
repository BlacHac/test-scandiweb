import React from 'react'
import CartProductCard from './Cart_ProductCard'

function CartOverlay() {
  return (
    <div className='absolute cartOverlay'>
        <p className='cartOverlay_description'><span className='bold'>My Bag,</span><span> 3</span><span> items</span></p>
        <CartProductCard />
        <CartProductCard />
    </div>
  )
}

export default CartOverlay