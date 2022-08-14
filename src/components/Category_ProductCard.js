import React, { useContext } from 'react';
import currencyContext from '../context/CurrencyContext';

function Category_ProductCard({id, brand, name, inStock, image, price}) {
  
  const {currency} = useContext(currencyContext);
  const selectedCurrency = price?.find(_currency => _currency.currency.label === currency) ;

  const noStockColor = inStock ? 'gray' : 'rgba(128, 128, 128, 0.6)';

  return (
    <div id={id} className='card relative' >
      <img className="card_img" src={image} /> 
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