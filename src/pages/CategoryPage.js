import React from 'react'
import Header from "../components/Header";
import {Link} from 'react-router-dom';
import Category_ProductCard from "../components/Category_ProductCard";

function CategoryPage() {



  
  return (
    <>
        <Header />
        <section className='container background-color-gray'>
          <div className='category_title_list d-flex'>
            <p className="category_title">all</p>
            <p className="category_title">clothes</p>
            <p className="category_title">tech</p>
          </div>
          <div className='d-flex gap'>
            <Link to="/product">
              <Category_ProductCard />
            </Link>
            <Category_ProductCard />
            <Category_ProductCard />
            <Category_ProductCard />
            <Category_ProductCard />
            <Category_ProductCard />
          </div>
        </section>
    </>
  )
}

export default CategoryPage