import React from 'react';
import { Link, useParams } from 'react-router-dom';
import RatingStars from "../../../components/RatingStars";
import { useDispatch } from "react-redux";
import { useFetchProductByIdQuery } from '../../../redux/Features/products/productsApi';
import { addToCart } from '../../../redux/Features/cart/cartSlice';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  const SingleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product details.</p>;

  return (
    <>
      {/* Breadcrumb */}
      <section className='section__container bg-primary-light'>
        <h2 className='section__header capitalize'>Single Product Page</h2>
        <div className='section__subheader space-x-2'>
          <span className='hover:text-primary'><Link to="/">home</Link></span>
          <i className="ri-arrow-right-s-line"></i>
          <span className='hover:text-primary'><Link to="/shop">shop</Link></span>
          <i className="ri-arrow-right-s-line"></i>
          <span className='text-gray-600'>{SingleProduct?.name}</span>
        </div>
      </section>

      {/* Product Section */}
      <section className='section__container mt-8'>
        <div className='flex flex-col md:flex-row gap-10 items-start'>
          <div className='md:w-1/2 w-full'>
            <img
              src={SingleProduct?.image}
              alt={SingleProduct?.name}
              className='rounded-md-full h-auto'
            />
          </div>

          <div className='md:w-1/2 w-full'>
            <h3 className='text-2xl font-semibold mb-4'>{SingleProduct?.name}</h3>
            <p className='text-xl text-primary'>
              ${SingleProduct?.price}
              {SingleProduct?.oldPrice && (
                <s className='ml-1'>${SingleProduct?.oldPrice}</s>
              )}
            </p>
            <p className='text-gray-400'>{SingleProduct?.description}</p>

            <div className='flex flex-col space-y-2'>
              <p><strong>Category:</strong> {SingleProduct?.category}</p>
              <p><strong>Color:</strong> {SingleProduct?.color}</p>
              <div className='flex gap-1 items-center'>
                <strong>Rating:</strong>
                <RatingStars rating={SingleProduct?.rating} />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(SingleProduct);
                }}
                className='mt-6 px-6 py-3 bg-primary text-white rounded-md'
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
