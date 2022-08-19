import React, {Component} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import {Client} from './client';
import {MASTER_DATA} from "./queries/graphqlQueries";
import {dataLayer} from './context/DataContext';
import Header from "./components/Header";


class App extends Component{

  constructor(){
    super()
    this.state = {
      data: null,
      error: false,
      loading: true
    }
  }
  
  static contextType = dataLayer;

  componentDidMount(){
    Client.query({query: MASTER_DATA}).then(({data, error, loading})=>{
      this.setState({
        data,
        error,
        loading
      })
    })
  }

  render () {
    

    if(this.state.error) return <h1>Error....</h1>
    if(this.state.loading) return <h1>Loading....</h1>

    return (
      <>
        <Router>
          <Header />
            <Routes>
              <Route path={'/'} element={<CategoryPage />} />
              { this.state.data?.categories[0].products.map(product =>{
                return(
                  <Route key={product.id} path={`/product/${product.id}`} 
                  element={<ProductDetailsPage id={product.id} name={product.name} brand={product.brand}
                  inStock={product.inStock} image={product.gallery} price={product.prices} 
                  description={product.description} attributes={product.attributes} />} />
                  )
                })
              }
              <Route path={'/cart'} element={<CartPage />} />
            </Routes>
        </Router>
        { this.context.cartOverlay &&
          <div className="page_mask"></div>
        }
      </>  
    );  
  }
}

export default App;


