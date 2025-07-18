import React, { useState } from 'react'
import ProductCards from './ProductCards'

import products from "../../data/products.json"

const TrendingProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8);
    const loadMoreProducts = () => {
    setVisibleProducts(prevCount => prevCount + 4)
}
  return (
    <section className='section__container products__container'>
      <h2 className='section__header'>Trending Products</h2>
      <p className='section__subheader mb-12'>Discover the Hottest Picks: Elevate Your Style with Our Curated Collection of Trending Women's Fashion Products.</p>

      {/* product Cards */}
      <div className='mt-12'>
      <ProductCards products={products.slice(0, visibleProducts)}/>
      </div>

      {/* Load more products btn */}
      <div className='product__btn'>
        {
          visibleProducts < products.length && (
            <button className='btn' onClick={loadMoreProducts}>Load More</button>
          )
        }
      </div>
    </section>
  )
}

export default TrendingProducts