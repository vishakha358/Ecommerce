import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../redux/Features/cart/cartSlice';
import OrderSummary from './OrderSummary';

const CartModal = ({ isopen, onclose }) => {
  const dispatch = useDispatch();

  // 🔥 Get cart products directly from Redux
  const products = useSelector((store) => store.cart.products);

  const handleQuantity = (type, _id) => {
    dispatch(updateQuantity({ type, _id }));
  };

  const handleRemove = (e, _id) => {
    e.preventDefault();
    dispatch(removeFromCart(_id));
  };

  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-80 transition-opacity duration-300 ${
        isopen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform duration-300 ${
          isopen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button onClick={onclose} className="text-red-600 hover:text-red-800">
              Close
            </button>
          </div>

          {products.length === 0 ? (
            <div className="text-center mt-8">Your cart is empty</div>
          ) : (
            products.map((item, index) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4"
              >
                <div className="flex items-center">
                  <span className="mr-4 px-2 bg-primary text-white rounded-full">{index + 1}</span>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover mr-4 rounded"
                  />
                  <div>
                    <h5 className="text-lg font-medium">{item.name}</h5>
                    <p className="text-gray-600 text-sm">${Number(item.price).toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex flex-row md:justify-start justify-end items-center mt-2">
                  <button
                    onClick={() => handleQuantity('decrement', item._id)}
                    className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-4"
                  >
                    -
                  </button>
                  <span className="px-2 text-center mx-1">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantity('increment', item._id)}
                    className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-2"
                  >
                    +
                  </button>
                  <div className="ml-5">
                    <button
                      onClick={(e) => handleRemove(e, item._id)}
                      className="text-red-500 hover:text-red-800 mr-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {products.length > 0 && <OrderSummary />}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
