import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import CartOverlay from './CartOverlay';
import {dataLayer} from '../context/DataContext'
import {CURRENCY} from '../queries/graphqlQueries';
import {Client} from '../client';


class Header extends Component{

  constructor(){
    super()
    this.state = {
      data: null,
      error: false,
      loading: true,
      currencyDropdown: false,
    }
  }

  static contextType = dataLayer;

  currency_dropDown = () => {
      this.setState((state) =>{
        return {
          currencyDropdown : !state.currencyDropdown
        }
      })
    }

    componentDidMount = () => {
      Client.query({query: CURRENCY}).then(({data, error, loading})=>{
        this.setState({
          data,
          error,
          loading
        })
      })
    }

  render () {

    const {currency, totalQuantity, updateCurrency, cartOverlay_dropDown, cartOverlay} = this.context

    if(this.state.error) return <h1>Error....</h1>
    if(this.state.loading) return <h1>Loading....</h1>

    const selectedCurrency = this.state.data?.currencies.find(_currency => _currency.label === currency);

    return (
      <header>
        <div className="container d-flex align-center space-between">
          <ul className="list d-flex">
            <li className="Nav_list_items">women</li>
            <li className="Nav_list_items">men</li>
            <li className="Nav_list_items">kids</li>
          </ul>
          <Link to='/'>
            <img className="logo" src="../images/logo.png" alt="logo" />
          </Link>
          <div className="d-flex align-center">
            <div className="bold relative header_currency">
              <div onClick={this.currency_dropDown} className="relative">
                <small id="currencies" className="header_currency" >{selectedCurrency?.symbol}</small>
                { 
                  !this.state.currencyDropdown ? 
                  <img className="absolute header_currency_arrowhead" src="../images/arrowhead-down.png" /> :
                  <img className="absolute header_currency_arrowhead" src="../images/arrowhead-up.png" /> 
                }
              </div>
              { this.state.currencyDropdown &&
                <ul className="list absolute currency_list_position anime">
                  { this.state.data?.currencies.map(currency =>{
                    return (
                      <li onClick={()=> updateCurrency(currency.label)} key={currency.label} id={currency.label} className="currency_list">{currency.symbol} {currency.label}</li>
                    )
                  })
  
                  }
                </ul>
              }
            </div>
            <div className="relative">
              { totalQuantity > 0 &&
                <div className="absolute qty_badge">
                  {totalQuantity}
                </div>
              }
              <img onClick={cartOverlay_dropDown} className="header_cart" src="../images/cart.svg" />
              { cartOverlay &&
                <CartOverlay />
              }
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header