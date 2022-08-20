import React, {Component} from 'react'
import {dataLayer} from '../context/DataContext';

class Cart_ProductCard extends Component {

    constructor(props){
        super(props)
        this.state = {
            imageIndex : 0,
            removeMessage : false
        }
    }
    
    static contextType = dataLayer

    nextImage = () => {
        this.setState((state, props) => {
            return state.imageIndex === props.image.length - 1 ? {imageIndex : 0} : {imageIndex : state.imageIndex + 1}
        })
    }
    
    prevImage = () => {
        this.setState((state, props) => {
            return state.imageIndex === 0 ? {imageIndex : props.image.length - 1} : {imageIndex : state.imageIndex - 1}
        })
    }

    removeMessageShow = () => {
        this.setState({removeMessage : true})
    }

    dontRemove = () => {
        this.setState({removeMessage : false})
    }

  render(){

    const {basket, currency, updateBasket} = this.context

    const selectedCurrency = this.props.price?.find(_currency => _currency.currency.label === currency) ;

    const findProduct = basket.find(_product => {
        return _product.id == this.props.id && Object.keys(this.props.chosenAttributes).every(_attribute => _product.chosenAttributes[_attribute] == this.props.chosenAttributes[_attribute]);
    })
    
    const increaseQuantity = () => {
        findProduct.qty += 1 ;
        updateBasket ([...basket])
    }

    const decreaseQuantity = () => {
        if(this.props.qty === 1){
            this.removeMessageShow()
        } else {
            findProduct.qty -= 1 ;
            updateBasket ([...basket])
        }
    }


    const updateAttribute = (attributeName, value) => {
        const duplicateProduct = basket.find(_product => _product.id == this.props.id && Object.keys(_product.chosenAttributes)
        .every(_attribute => {
            const selectedAttributeValue = (_attribute === attributeName) ? value : this.props.chosenAttributes[_attribute];
            return _product.chosenAttributes[_attribute] === selectedAttributeValue
        }))

        if(duplicateProduct){
            alert('this product with same attribute available')
        } else {
            findProduct.chosenAttributes[attributeName] = value ;
            updateBasket ([...basket])
            console.log("else")
        }
    }

    const removeProduct = () => {
        const afterRemovedProduct = basket.filter(_product => _product != findProduct);
        updateBasket ([...afterRemovedProduct])
    }

    return (
        <>
            <div className='cart_product_card d-flex space-between'>
                <div>
                    <div>
                        <p className="product_brand" >{this.props.brand}</p>
                        <p className="product_name">{this.props.name}</p>
                    </div>
                    <div>  
                        <p className="price"><small>{selectedCurrency?.currency.symbol}</small><span>{selectedCurrency?.amount}</span></p>
                    </div>
                    { this.props.attributes.map(attribute =>{
                        if (attribute.type === 'swatch') {
                            return (
                            <div key={attribute.id}>     
                                <p className="cart_item_subtitle">{attribute.name}:</p>
                                <div className="cart_item_color d-flex">
                                { attribute.items.map(item =>{
                                    return(
                                    <div onClick={()=>updateAttribute(attribute.name, item.value, item.id)}
                                    className={this.props.chosenAttributes[attribute.name] == item.value ? "selectedSwatch" : ""}
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
                                <p className="cart_item_subtitle">{attribute.name}:</p>
                                <div className="cart_item_size d-flex">
                                { attribute.items.map( item =>{
                                    return(
                                    <div onClick={()=>updateAttribute(attribute.name, item.value, item.id)}
                                    className={this.props.chosenAttributes[attribute.name] == item.value ? "selected" : ""}
                                    key={item.id} id={item.id}>
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
                </div>
                <div className="cart_item_cardLeft">
                    <div className='qty_change'>
                        <button onClick={increaseQuantity} >+</button> 
                        <span>{this.props.qty}</span>
                        <button onClick={decreaseQuantity}>-</button> 
                    </div>
                    <div className='image_thumbnail relative'>
                        <img src={this.props.image[this.state.imageIndex]}  />
                        { this.props.image.length > 1 &&
                            <>
                                <button onClick={this.prevImage} className='btn_next' >{"<"}</button>
                                <button onClick={this.nextImage} className='btn_prev' >{">"}</button>
                            </>
                        }
                    </div>
                    <button onClick={removeProduct} className="remove_product"> <img src="../images/x.svg" /> </button>
                </div>
            </div>
            {   this.state.removeMessage &&
                <div className='d-flex removeMessage bold'>
                    <p>Do you want to remove this item ?</p>
                    <button onClick={removeProduct} className="bold">Yes</button>
                    <button onClick={this.dontRemove} className="bold">No</button>
                </div>
            }
        </>
    )
  }

}

export default Cart_ProductCard