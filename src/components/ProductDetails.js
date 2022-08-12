
import React, {useState} from 'react'

function ProductDetails({id, name, brand, image, price, description, attributes}) {

  const [productImage, setProductImage] = useState(image[0]);
  const smallThumbnailImage = image?.filter(_image => _image != productImage) ;

  return (
    <div className='container d-flex product_details'>
      <div className='image_sm_thumbnail d-flex column'>
        { smallThumbnailImage?.map(image =>{
          return (
              <img onClick={() => setProductImage(image) } key={image} src={image} />
            )
          })
        }
      </div>
      <div className='image_lg_thumbnail'>
        <img src={productImage}  />
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
                      <div className={attribute.name} key={item.id} id={item.id} style={{backgroundColor:`${item.value}`}}></div>
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
                      <div className={attribute.name} key={item.id} id={item.id}>
                        {item.value}
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
        <button id={id} className="button-primary" >Add to cart</button>
        <div className="product_description">
          {description}
        </div>
      </div>
    </div>
  )

}

export default ProductDetails