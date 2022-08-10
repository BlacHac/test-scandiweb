
import React from 'react'
import {Link} from 'react-router-dom';

function ProductDetails({id, name, brand, image, price, currency, description}) {

  return (
    <div className='container d-flex product_details'>
      <div className='image_sm_thumbnail'>
        { image.slice(1).map(image =>{
          return (
              <img key={image} src={image} />
            )
          })
        }
      </div>
      <div className='image_lg_thumbnail'>
        <img src={image[0]}  />
      </div>
      <div className='product_details_body'>
        <div>
          <p className="product_brand bold" >{brand}</p>
          <p className="product_name">{name}</p>
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
          <p className="price"><small>{currency}</small><span>{price}</span></p>
        </div>
        <Link to='/cart'>
          <button className="button-primary" >Add to cart</button>
        </Link>
        <div className="product_description">
          {description}
        </div>
      </div>
    </div>
  )

}

export default ProductDetails