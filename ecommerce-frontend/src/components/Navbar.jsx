import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartModal from '../pages/shop/CartModal';
import avatarImg from '../assets/avatar.png';
import { useLogoutUserMutation } from '../redux/Features/auth/authApi';
import { logout } from '../redux/Features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.cart.products);
  const { user } = useSelector((state) => state.auth);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [logoutUser] = useLogoutUserMutation();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const adminDropDownMenus = [
    { label: 'Dashboard', path: '/dashboard/admin' },
    { label: 'Manage Items', path: '/dashboard/manage-products' },
    { label: 'All Orders', path: '/dashboard/manage-orders' },
    { label: 'Add New Post', path: '/dashboard/add-new-post' },
  ];

  const userDropDownMenus = [
    { label: 'Dashboard', path: '/dashboard/user' },
    { label: 'Profile', path: '/dashboard/manage-profile' },
    { label: 'Payments', path: '/dashboard/payments' },
    { label: 'Orders', path: '/dashboard/orders' },
  ];

  const dropdownMenus =
    user?.role === 'admin' ? adminDropDownMenus : userDropDownMenus;

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center py-4">
        {/* Nav Links */}
        <ul className="nav__links flex gap-6">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/about">About Us</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Logo */}
        <div className="nav__logo text-2xl font-bold">
          <Link to="/">
            Lebaba<span className="text-primary">.</span>
          </Link>
        </div>

        {/* Nav Icons */}
        <div className="nav__icons relative flex gap-5 items-center">
          <Link to="/search" className="hover:text-primary">
            <i className="ri-search-line text-xl"></i>
          </Link>

          <button onClick={handleCartToggle} className="relative hover:text-primary">
            <i className="ri-shopping-bag-line text-xl"></i>
            {products.length > 0 && (
              <sup className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 bg-primary text-white rounded-full">
                {products.length}
              </sup>
            )}
          </button>

          <span>
            {user ? (
              <>
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt="avatar"
                  className="size-6 rounded-full cursor-pointer"
                />

                {isDropDownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            className="dropDown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="dropDown-items text-left w-full"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="hover:text-primary">
                <i className="ri-user-line text-xl"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal
          products={products}
          isopen={isCartOpen}
          onclose={handleCartToggle}
        />
      )}
    </header>
  );
};

export default Navbar;
