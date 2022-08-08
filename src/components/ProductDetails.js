import React from 'react'
import {Link} from 'react-router-dom';

function ProductDetails() {

  return (
    <div className='container d-flex product_details'>
      <div className='image_sm_thumbnail'>
        <img src="https://m.media-amazon.com/images/I/71eMTvCGloL._AC_UX425_.jpg"  />
        <img src="https://m.media-amazon.com/images/I/71eMTvCGloL._AC_UX425_.jpg"  />
        <img src="https://m.media-amazon.com/images/I/71eMTvCGloL._AC_UX425_.jpg"  />
      </div>
      <div className='image_lg_thumbnail'>
        <img src="https://m.media-amazon.com/images/I/71eMTvCGloL._AC_UX425_.jpg"  />
      </div>
      <div className='product_details_body'>
        <div>
          <p className="product_brand bold" >Apollo</p>
          <p className="product_name">Running Short</p>
        </div>
        <div>
          <p className="product_subtitle">SIZE:</p>
          <div className="product_size d-flex">
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
          <p className="product_subtitle">COLOR:</p>
          <div className="product_color d-flex">
            <div style={{backgroundColor:'black'}}></div>
            <div style={{backgroundColor:'gray'}}></div>
            <div style={{backgroundColor:'white'}}></div>
          </div>
        </div> 
        <div>  
          <p className="product_subtitle">PRICE:</p>
          <p className="price"><small>$</small><span>50.00</span></p>
        </div>
        <Link to='/cart'>
          <button className="button-primary" >Add to cart</button>
        </Link>
        <p className="product_description">
          lorem ipsum dolor sit amet, consect adipiscing lorem lorem ipsum dolor sit amet, consectetur adipiscing lorem
        </p>
      </div>
    </div>
  )

}

export default ProductDetails