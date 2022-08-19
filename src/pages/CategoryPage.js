import React, {Component} from 'react'
import Header from '../components/Header';
import {Link} from 'react-router-dom';
import CategoryProductCard from '../components/Category_ProductCard';
import {MASTER_DATA} from '../queries/graphqlQueries';
import {Client} from '../client';

class CategoryPage extends Component{

  constructor(){
    super()
    this.state = {
      data: null ,
      error: false,
      loading: true,
      category: 'all'
    }
  }

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

    if (this.state.error) return <h1>Error....</h1>
    if (this.state.loading) return <h1>Loading....</h1>

    const productsList = this.state.data?.categories.find(_category => _category.name === this.state.category);

    return (
      <>
        <Header />
        <section className='container background-color-gray'>
          <div className='category_title_list d-flex'>
            {
              this.state.data?.categories.map(_category => <p onClick={()=>this.setState({category: _category.name})} 
              key={_category.name} id={_category.name} 
              className={`category_title ${this.state.category === _category.name ? "selected" : ""}`} >{_category.name}</p>)
            }
          </div>
          <div className='d-flex gap'>
            { productsList.products.map(product => {
                return (product.inStock ?
                        <Link to={`/product/${product.id}`} key={product.name}>
                            <CategoryProductCard id={product.id} brand={product.brand} name={product.name} 
                            inStock={product.inStock} image={product.gallery} price={product.prices} attribute={product.attributes}/>
                        </Link> 
                      :
                        <CategoryProductCard key={product.name} id={product.id} brand={product.brand} name={product.name} 
                        inStock={product.inStock} image={product.gallery} price={product.prices} attribute={product.attributes} />
                      )
              })
            }
          </div>
        </section>
      </>
    )
  }
  }

export default CategoryPage