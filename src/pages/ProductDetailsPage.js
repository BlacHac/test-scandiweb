import React from 'react'
import Header from "../components/Header";
import ProductDetails from "../components/ProductDetails";

function ProductDetailsPage({id, name, brand, image, price, currency, description}) {
  return (
    <>
        <Header />
        <ProductDetails id={id} name={name} brand={brand} 
        image={image} price={price} currency={currency} description={description} 
         />
    </>
  )
}

export default ProductDetailsPage