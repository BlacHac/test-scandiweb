import React, {Component} from 'react';

export const dataLayer = React.createContext();

class DataLayerProvider extends Component{

    constructor(){
        super()
        this.state = {
            basket: [],
            currency: 'USD'
        } 
    }

    updateCurrency = (selectedCurrencyLabel) => {
        this.setState(() => {
            return {currency : selectedCurrencyLabel}
        })
    }

    updateBasket = (newBasket) => {
        this.setState(() => {
            return {basket : newBasket}
        })
    }
    
    render () {
        const {basket, currency} = this.state
        const {updateCurrency, updateBasket} = this

        let totalQuantity = 0;
        this.state.basket.forEach(_product => totalQuantity += _product.qty)
        const value = {basket, currency, totalQuantity, updateCurrency, updateBasket}

        return (
            <dataLayer.Provider value={value}>
                {this.props.children}
            </dataLayer.Provider>
        )
    }
}

export default DataLayerProvider
