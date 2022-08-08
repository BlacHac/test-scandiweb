import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route path={'/'} element={<CategoryPage />} />
            <Route path={'/product'} element={<ProductDetailsPage />} />
            <Route path={'/cart'} element={<CartPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
