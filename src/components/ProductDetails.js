
import React from 'react'
import {Link} from 'react-router-dom';

function ProductDetails({id, name, brand, image, price, description, attributes}) {

  return (
    <div className='container d-flex product_details'>
      <div className='image_sm_thumbnail d-flex column'>
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
        { attributes.map(attribute =>{
          if (attribute.type === 'swatch') {
            return (
              <div key={attribute.id}>     
                <p className="product_subtitle">{attribute.name}:</p>
                <div className="product_color d-flex">
                  { attribute.items.map(item =>{
                    return(
                      <div key={item.id} style={{backgroundColor:`${item.value}`}}></div>
                    )
                  })

                  }
                </div>
              </div> 
            )
          } else {
            return (
              <div key={attribute.id}>
                <p className="product_subtitle">{attribute.name}:</p>
                <div className="product_size d-flex">
                  { attribute.items.map( item =>{
                    return(
                      <div key={item.id}>
                        <span>{item.value}</span>
                      </div>
                      )
                    })
                  }
                </div>
              </div>
              )
            }
          })
        }
        <div>  
          <p className="product_subtitle">PRICE:</p>
          <p className="price"><small>{price.currency.symbol}</small><span>{price.amount}</span></p>
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