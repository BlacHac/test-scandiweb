import React, {useContext, useState} from 'react'
import currencyContext from '../context/CurrencyContext';
import {basketContext} from '../context/BasketContext';

function Cart_ProductCard({id, chosenAttributes, name, brand, image, price, attributes, qty}) {

    const {currency} = useContext(currencyContext)
    const selectedCurrency = price?.find(_currency => _currency.currency.label === currency) ;

    const {basket, setBasket} = useContext(basketContext)
    const [attributeSelected, setAttributeSelected] = useState(chosenAttributes);
    const [imageIndex, setImageIndex] = useState(0);

    const findProduct = basket.find(_product => {
        return _product.id == id && Object.keys(chosenAttributes).every(_attribute => _product.chosenAttributes[_attribute] == chosenAttributes[_attribute]);
    })

    const updateAttribute = (attributeName, value) => {
        setBasket(prevBasket => {
            findProduct.chosenAttributes[attributeName] = value ;
            return [...prevBasket]
        });
    }

    const nextImage = () => {
        setImageIndex(prevImageIndex => {
            return prevImageIndex === image.length - 1 ? 0 : prevImageIndex + 1
        })
    }
    
    const prevImage = () => {
        setImageIndex(prevImageIndex => {
            return prevImageIndex === 0 ? image.length - 1 : prevImageIndex - 1
        })
    }

    const increaseQuantity = () => {
        setBasket(prevBasket => {
            findProduct.qty += 1 ;
            return [...prevBasket]
        });
    }

    const decreaseQuantity = () => {
        if(qty === 1){
            setBasket(prevBasket => {
                const afterRemovedProduct = prevBasket.filter(_product => _product != findProduct);
                return afterRemovedProduct
            });
        } else {
            setBasket(prevBasket => {
                findProduct.qty -= 1 ;
                return [...prevBasket]
            });
        }
    }


  return (
    <div className='cart_product_card d-flex space-between'>
        <div>
            <div>
                <p className="product_brand" >{brand}</p>
                <p className="product_name">{name}</p>
            </div>
            <div>  
                <p className="price"><small>{selectedCurrency?.currency.symbol}</small><span>{selectedCurrency?.amount}</span></p>
            </div>
            { attributes.map(attribute =>{
                if (attribute.type === 'swatch') {
                    return (
                    <div key={attribute.id}>     
                        <p className="cart_item_subtitle">{attribute.name}:</p>
                        <div className="cart_item_color d-flex">
                        { attribute.items.map(item =>{
                            return(
                            <div onClick={()=>updateAttribute(attribute.name, item.value, item.id)}
                            className={attributeSelected[attribute.name] == item.value ? "selectedSwatch" : ""}
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
                            className={chosenAttributes[attribute.name] == item.value ? "selected" : ""}
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
                <span>{qty}</span>
                <button onClick={decreaseQuantity}>-</button> 
            </div>
            <div className='image_thumbnail relative'>
                <img src={image[imageIndex]}  />
                { image.length > 1 &&
                    <>
                        <button onClick={prevImage} className='btn_next' >{"<"}</button>
                        <button onClick={nextImage} className='btn_prev' >{">"}</button>
                    </>
                }
            </div>
        </div>
    </div>


  )

}

export default Cart_ProductCard