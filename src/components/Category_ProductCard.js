import React from 'react'

function Category_ProductCard({id, brand, name, inStock, image, price, currency}) {
  return (
    <div id={id} className='card' >
      <img className="card_img" src={image} /> 
      <p className='card_title'>{brand} {name}</p>
      <div className='price'>
        <small>{currency}</small><span>{price}</span>
      </div>
    </div>
  )
}

export default Category_ProductCard