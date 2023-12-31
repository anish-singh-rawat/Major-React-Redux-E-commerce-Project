import React, { useEffect, useState } from 'react'
import SingleProduct from '../components/SingleProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getProductstart } from '../redux/action/product.action'
import { getCategorystart } from '../redux/action/category.action'
import { Link } from 'react-router-dom'

export default function ShopCategory() {
  let [range, setRange] = useState(50);
  let [category, setCategory] = useState('all')

  const products = useSelector(state => state.product.products)
  const categories = useSelector(state => state.category.categories)
  
  const [filterProductItem, setFilterproductItem] = useState([])

  const dispatch = useDispatch()

  const categoryChange = (value) => {

    setCategory(value)

    setTimeout(() => {
      filterProducts();
    }, 2000);
  }

  const filterProducts = () => {
    const fProducts = []

    if (category === 'all') {
      for (let product of products) {

        // if (parseFloat(product.final_price) <= range) {
          fProducts.push(product);
        // }
      }
    }
     else {
      for (let product of products) {

        if (product.category === category && parseFloat(product.final_price) <= range) {
          fProducts.push(product);
        }
      }
    }
    setFilterproductItem([...fProducts])
  }


  useEffect(() => {
    dispatch(getProductstart())
    dispatch(getCategorystart())
    filterProducts()
  }, [ filterProductItem.length , products.length, categories.length, category, range])
  return (
    <>
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div className="container">
            <div className="banner_content d-md-flex justify-content-between align-items-center">
              <div className="mb-3 mb-md-0">
                <h2>Shop Category</h2>
                <p>Very us move be blessed multiply night</p>
              </div>
              <div className="page_link">
                <a href="index.html">Home</a>
                <a href="category.html">Shop</a>
                <a href="category.html">Women Fashion</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cat_product_area section_gap">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-9">
              <div className="product_top_bar">
                <div className="left_dorp">
                  <select className="sorting">
                    <option value="1">Default sorting</option>
                    <option value="2">Default sorting 01</option>
                    <option value="4">Default sorting 02</option>
                  </select>
                  <select className="show">
                    <option value="1">Show 12</option>
                    <option value="2">Show 14</option>
                    <option value="4">Show 16</option>
                  </select>
                </div>
              </div>

              <div className="latest_product_inner">
                <div className="row">
                  {
                    filterProductItem.length > 0 && filterProductItem.map((product, index) => (
                      <div className="col-lg-4 col-md-6" key={index}>
                        <SingleProduct product={product} />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="left_sidebar_area">
                <aside className="left_widgets p_filter_widgets">
                  <div className="l_w_title">
                    <h3>Browse Categories</h3>
                  </div>
                  <div className="widgets_inner">
                    <ul className="list">
                      <li>
                        <Link onClick={() => categoryChange('all')}>All</Link>
                      </li>
                      {
                        categories.length > 0 && categories.map((category) => (
                          <li key={category.id}>
                            <Link onClick={() => categoryChange(category.id)}>{category.name}</Link>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </aside>

                <aside className="left_widgets p_filter_widgets">
                  <div className="l_w_title">
                    <h3>Price Filter</h3>
                  </div>
                  <div className="widgets_inner">
                    <div className="range_item">
                      <div id="slider-range">
                        <input type="range" style={{ width: "100%" }} onChange={(event) => setRange(event.target.value)} />
                        <p>range $ {range}</p>
                      </div>

                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


