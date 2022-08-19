import React, { Component } from 'react';
import {dataLayer} from '../context/DataContext';
import {Link} from 'react-router-dom';

class Category_ProductCard extends Component{
  
  static contextType = dataLayer

  render(){

    const {basket, currency, updateBasket} = this.context

    const selectedCurrency = this.props.price?.find(_currency => _currency.currency.label === currency) ;

    const noStockColor = this.props.inStock ? 'gray' : 'rgba(128, 128, 128, 0.6)';

    const addToBasket = () => {
      const findProduct = basket.find(_product => _product.id === this.props.id);
      if(findProduct){
          findProduct.qty += 1 ;
          updateBasket([...basket])
        } else {
          updateBasket ([
          ...basket,
          {
            id:this.props.id,
            chosenAttributes : {},
            name: this.props.name,
            brand: this.props.brand,
            image: this.props.image,
            price: this.props.price,
            attributes: this.props.attribute,
            qty : 1
          }
        ])
      }
    }

    return (
      <div id={this.props.id} className='card relative' >
        <div className='relative'>
          <img className="card_img" src={this.props.image[0]} /> 
          { this.props.inStock && !this.props.attribute.length &&
            <Link to='/'>
              <div onClick={addToBasket} className="absolute cart_badge">
                <img src="../images/cart.svg" />
              </div>
            </Link>
          }
        </div>
        <p className='card_title' style={{color:`${noStockColor}`}} >{this.props.brand} {this.props.name}</p>
        <div className='price' style={{color:`${noStockColor}`}}>
          <small>{selectedCurrency.currency.symbol}</small><span>{selectedCurrency.amount}</span>
        </div>
        { !this.props.inStock &&
          <div className='bold absolute outOfStock d-flex align-center'>
            <p>Out of Stock</p>
          </div>
        }
      </div>
    )
  }
}

export default Category_ProductCard