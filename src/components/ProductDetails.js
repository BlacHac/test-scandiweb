import React, {Component} from 'react'
import {dataLayer} from '../context/DataContext';

class ProductDetails extends Component {

  constructor (props) {
    super (props)
    this.state = {
      productImage: props.image[0],
      attributeSelected: {}
    }
  }

  static contextType = dataLayer;


  selectedAttribute = (attributeName, value) => {
    this.setState( (state) => {
      return {
        attributeSelected: {...state.attributeSelected,
          [attributeName] : value
        }
      }
    })
  }

  render () {

    const {basket, currency, updateBasket} = this.context
    const selectedCurrency = this.props.price?.find(_currency => _currency.currency.label === currency) ;
    const smallThumbnailImage = this.props.image?.filter(_image => _image != this.state.productImage) ;

    const addToBasket = () => {
      if(this.props.attributes.length === Object.keys(this.state.attributeSelected).length){
        const findProduct = basket.find(_product => _product.id === this.props.id && 
          Object.keys(this.state.attributeSelected).every(_attribute => this.state.attributeSelected[_attribute] == _product.chosenAttributes[_attribute])
            );
          if(findProduct){
              findProduct.qty += 1 ;
              updateBasket ([...basket])
            } else {
              updateBasket ([
              ...basket,
              {
                id: this.props.id,
                chosenAttributes : this.state.attributeSelected,
                name: this.props.name,
                brand: this.props.brand,
                image: this.props.image,
                price: this.props.price,
                attributes: this.props.attributes,
                qty : 1
              }
            ])
          }
        this.setState( () => {
          return {
            attributeSelected: {}
          }
        })
      } else {
        alert('Please select an option from each attribute')
      }
    }

    return (
      <div className='container d-flex product_details'>
        <div className='image_sm_thumbnail d-flex column'>
          { smallThumbnailImage?.map(_image =>{
            return (
                <img onClick={() => this.setState({productImage:_image}) } key={_image} src={_image} />
              )
            })
          }
        </div>
        <div className='image_lg_thumbnail'>
          <img src={this.state.productImage}  />
        </div>
        <div className='product_details_body'>
          <div>
            <p className="product_brand bold" >{this.props.brand}</p>
            <p className="product_name">{this.state.name}</p>
          </div>
          { this.props.attributes.map(attribute =>{
            if (attribute.type === 'swatch') {
              return (
                <div key={attribute.id}>     
                  <p className="product_subtitle">{attribute.name}:</p>
                  <div className="product_color d-flex">
                    { attribute.items.map(item =>{
                      return(
                        <div onClick={()=>this.selectedAttribute(attribute.name, item.value, item.id)} 
                        className={this.state.attributeSelected[attribute.name] == item.value ? "selectedSwatch" : "" }
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
                        <div className={this.state.attributeSelected[attribute.name] == item.value ? "selected" : "" } 
                        onClick={()=>this.selectedAttribute(attribute.name, item.value, item.id)} key={item.id} id={item.id}>
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
          <div className="product_description" dangerouslySetInnerHTML={{__html: this.props.description}} />
        </div>
      </div>
    )

  }

}

export default ProductDetails