import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import {useQuery } from "@apollo/client";
import {MASTER_DATA} from "./queries/graphqlQueries";


function App() {

  const {data, error,loading} = useQuery(MASTER_DATA);

  

  if(error) return <h1>Error....</h1>
  if(loading) return <h1>Loading....</h1>

  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route path={'/'} element={<CategoryPage />} />
            { data.categories[0].products.map(product =>{
              return(
                <Route key={product.id} path={`/product/${product.id}`} 
                element={<ProductDetailsPage id={product.id} name={product.name} brand={product.brand}
                inStock={product.inStock} image={product.gallery} price={product.prices[0].amount} 
                currency={product.prices[0].currency.symbol} description={product.description} 
                 />} />
              )
            })

            }
            <Route path={'/cart'} element={<CartPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
