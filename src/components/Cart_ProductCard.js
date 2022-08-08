import React from 'react'

function Cart_ProductCard() {


  return (
    <div className='cart_product_card d-flex space-between'>
        <div>
            <div>
                <p className="product_brand" >Apollo</p>
                <p className="product_name">Running Short</p>
            </div>
            <div>  
                <p className="price"><small>$</small><span>50.00</span></p>
            </div>
            <div>
                <p className="cart_item_subtitle size">SIZE:</p>
                <div className="cart_item_size">
                    <div>
                        <span>XS</span>
                    </div>
                    <div style={{backgroundColor:'black', color:'white'}}> 
                        <span>S</span>
                    </div>
                    <div>
                        <span>M</span>
                    </div>
                    <div>
                        <span>L</span>
                    </div>
                </div>
            </div>
            <div>     
                <p className="cart_item_subtitle">COLOR:</p>
                <div className="cart_item_color">
                    <div style={{backgroundColor:'black'}}></div>
                    <div style={{backgroundColor:'gray'}}></div>
                    <div style={{backgroundColor:'white'}}></div>
                </div>
            </div> 
        </div>
        <div className="cart_item_cardLeft">
            <div className='qty_change'>
                <button >+</button> 
                <span>0</span>
                <button>-</button> 
            </div>
            <div className='image_thumbnail relative'>
                <img src="https://m.media-amazon.com/images/I/71eMTvCGloL._AC_UX425_.jpg"  />
                <button className='btn_next' >{"<"}</button>
                <button className='btn_prev' >{">"}</button>
            </div>
        </div>
    </div>


  )

}

export default Cart_ProductCard