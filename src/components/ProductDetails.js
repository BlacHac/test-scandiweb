import React, {useState, useContext} from 'react'
import currencyContext from '../context/CurrencyContext';
import {basketContext} from '../context/BasketContext';

function ProductDetails({id, name, brand, image, price, description, attributes}) {

  const [productImage, setProductImage] = useState(image[0]);
  const smallThumbnailImage = image?.filter(_image => _image != productImage) ;

  const {currency} = useContext(currencyContext)
  const selectedCurrency = price?.find(_currency => _currency.currency.label === currency) ;

  const {setBasket} = useContext(basketContext); 
  const [attributeSelected, setAttributeSelected] = useState({});

  const selectedAttribute = (attributeName, value) => {
    setAttributeSelected( prevAttributeSelected => {
      return {
        ...prevAttributeSelected,
        [attributeName] : value
      }
    })
  }

  const addToBasket = () => {
    if(attributes.length === Object.keys(attributeSelected).length){
      setBasket(prevBasket => {
        const findProduct = prevBasket.find(_product => _product.id === id && 
        Object.keys(attributeSelected).every(_attribute => attributeSelected[_attribute] == _product.chosenAttributes[_attribute])
          );
        if(findProduct){
            findProduct.qty += 1 ;
            return [...prevBasket]
          } else {
            return [
            ...prevBasket,
            {
              id:id,
              chosenAttributes : attributeSelected,
              name: name,
              brand: brand,
              image: image,
              price: price,
              attributes: attributes,
              qty : 1
            }
          ]
        }
      });
      setAttributeSelected({});
    } else {
      alert('Please select an option from each attribute')
    }
  }

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
                      <div onClick={()=>selectedAttribute(attribute.name, item.value, item.id)} 
                      className={attributeSelected[attribute.name] == item.value ? "selectedSwatch" : "" }
                      key={item.id} id={item.id} style={{backgroundColor:`${item.value}`}}></div>
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
                      <div className={attributeSelected[attribute.name] == item.value ? "selected" : "" } 
                      onClick={()=>selectedAttribute(attribute.name, item.value, item.id)} key={item.id} id={item.id}>
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
          <p className="price"><small>{selectedCurrency.currency.symbol}</small><span>{selectedCurrency.amount}</span></p>
        </div>
        <button onClick={addToBasket} className="button-primary" >Add to cart</button>
        <div className="product_description" dangerouslySetInnerHTML={{__html:description}} />
      </div>
    </div>
  )

}

export default ProductDetails