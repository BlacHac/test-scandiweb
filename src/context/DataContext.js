import React, {Component} from 'react';

export const dataLayer = React.createContext();

class DataLayerProvider extends Component{

    constructor(){
        super()
        this.state = {
            basket: [],
            currency: 'USD',
            cartOverlay: false
        } 
    }

    updateCurrency = (selectedCurrencyLabel) => {
        this.setState({currency : selectedCurrencyLabel})
    }

    updateBasket = (newBasket) => {
        this.setState({basket : newBasket})
    }

    cartOverlay_dropDown = () => {
        this.setState((state) => {
            return {cartOverlay: !state.cartOverlay}
        })
    }
    
    render () {
        
        const {basket, currency, cartOverlay} = this.state
        const {updateCurrency, updateBasket, cartOverlay_dropDown} = this

        let totalQuantity = 0;
        this.state.basket.forEach(_product => totalQuantity += _product.qty)

        let selectedCurrency_symbol = '';
        const total_eachItem = basket.map(_product => {
        return _product.price.map(_price => {
            if(_price.currency.label === currency){
            selectedCurrency_symbol = _price.currency.symbol
            return _price.amount * _product.qty
            }
        }).find(_item => _item)
        });
    
    let subTotal = 0;
      total_eachItem.forEach(_item => subTotal += _item)

        const value = {
            basket, currency, totalQuantity, updateCurrency, 
            updateBasket, selectedCurrency_symbol, subTotal, 
            cartOverlay_dropDown, cartOverlay
        }

        return (
            <dataLayer.Provider value={value}>
                {this.props.children}
            </dataLayer.Provider>
        )
    }
}

export default DataLayerProvider
