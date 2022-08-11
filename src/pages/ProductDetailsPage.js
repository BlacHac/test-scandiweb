import React from 'react'
import Header from "../components/Header";
import ProductDetails from "../components/ProductDetails";

function ProductDetailsPage({id, name, brand, image, price, description, attributes}) {
  return (
    <>
        <Header />
        <ProductDetails id={id} name={name} brand={brand} 
        image={image} price={price} description={description} 
        attributes={attributes} />
    </>
  )
}

export default ProductDetailsPage