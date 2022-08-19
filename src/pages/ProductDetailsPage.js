import React, { Component } from 'react'
import Header from "../components/Header";
import ProductDetails from "../components/ProductDetails";

class ProductDetailsPage extends Component{
  
  render () {
    
    return (
      <>
          <Header />
          <ProductDetails id={this.props.id} name={this.props.name} brand={this.props.brand} 
          image={this.props.image} price={this.props.price} description={this.props.description} 
          attributes={this.props.attributes} />
      </>
    )
  }

}

export default ProductDetailsPage