import React from 'react'
import Header from "../components/Header";
import CartProductCard from '../components/Cart_ProductCard';

function CartPage() {
  return (
    <>
        <Header />
        <section className='container'>
            <h2 className='category_title'>Cart</h2>
             <hr/><CartProductCard /><hr/>
            <div className="fCalc fontSize">
                <p>Tax<span className='price tax'> 21%:</span><small className='bold'> $</small><span className='cart_item_price bold'>42.00</span></p>
                <p>Quantity:<span className='cart_item_price bold'> 3</span></p>
                <p><span className='total'>Total:</span><small className='bold'> $</small><span className='cart_item_price bold'>200.00</span></p>
                <button className='button-primary'>Order</button>
            </div>
        </section>
        
    </>
  )
}

export default CartPage