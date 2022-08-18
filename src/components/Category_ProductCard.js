import React, { useContext } from 'react';
import currencyContext from '../context/CurrencyContext';
import {basketContext} from '../context/BasketContext';
import {Link} from 'react-router-dom';

function Category_ProductCard({id, brand, name, inStock, image, price, attribute}) {
  
  const {currency} = useContext(currencyContext);
  const selectedCurrency = price?.find(_currency => _currency.currency.label === currency) ;
  
  const {setBasket} = useContext(basketContext); 

  const noStockColor = inStock ? 'gray' : 'rgba(128, 128, 128, 0.6)';

  const addToBasket = () => {
    setBasket(prevBasket => {
      const findProduct = prevBasket.find(_product => _product.id === id);
      if(findProduct){
          findProduct.qty += 1 ;
          return [...prevBasket]
        } else {
          return [
          ...prevBasket,
          {
            id:id,
            chosenAttributes : {},
            name: name,
            brand: brand,
            image: image,
            price: price,
            attributes: attribute,
            qty : 1
          }
        ]
      }
    });
  }

  return (
    <div id={id} className='card relative' >
      <div className='relative'>
        <img className="card_img" src={image[0]} /> 
        { inStock && !attribute.length &&
          <Link to='/'>
            <div onClick={addToBasket} className="absolute cart_badge">
              <img src="../images/cart.svg" />
            </div>
          </Link>
        }
      </div>
      <p className='card_title' style={{color:`${noStockColor}`}} >{brand} {name}</p>
      <div className='price' style={{color:`${noStockColor}`}}>
        <small>{selectedCurrency.currency.symbol}</small><span>{selectedCurrency.amount}</span>
      </div>
      { !inStock &&
        <div className='bold absolute outOfStock d-flex align-center'>
          <p>Out of Stock</p>
        </div>
      }
    </div>
  )
}

export default Category_ProductCard