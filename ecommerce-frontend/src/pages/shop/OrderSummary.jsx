import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '/src/redux/Features/cart/cartSlice.js';

const OrderSummary = () => {
  const dispatch = useDispatch();

  const {
    selectedItems = 0,
    totalPrice = 0,
    tax = 0,
    taxRate = 0.1,
    grandTotal = 0,
    products = [],
  } = useSelector((store) => store.cart || {});

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="bg-primary-light mt-5 rounded text-base shadow-md max-w-md mx-auto">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl font-semibold text-text-dark">Order Summary</h2>

        <p>Total Items: {selectedItems}</p>
        <p>Total Price: ${totalPrice?.toFixed(2)}</p>
        <p>Tax ({(taxRate * 100).toFixed(0)}%): ${tax?.toFixed(2)}</p>
        <h3 className="font-bold text-lg">Grand Total: ${grandTotal?.toFixed(2)}</h3>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleClearCart}
            className="bg-red-500 px-3 py-2 text-white rounded-md flex justify-center items-center gap-2 hover:bg-red-600"
          >
            <span>Clear Cart</span>
            <i className="ri-delete-bin-7-line"></i>
          </button>

          <button
            className="bg-green-600 px-3 py-2 text-white rounded-md flex justify-center items-center gap-2 hover:bg-green-700"
          >
            <span>Proceed to Checkout</span>
            <i className="ri-bank-card-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
