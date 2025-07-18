import { createBrowserRouter } from 'react-router-dom';
import App from "../App";


import Home from "../pages/home/Home.jsx";
import CategoryPage from "../pages/category/CategoryPage.jsx"; 
import Search from "../pages/search/Search.jsx";
import ShopPage from "../pages/shop/ShopPage.jsx";
import SingleProduct from "../pages/shop/productDetails/SingleProduct.jsx"

import Pages from "../pages/Pages.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx"; 


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/categories/:categoryName", element: <CategoryPage /> },
      { path: "/search", element: <Search /> },
      { path: "/shop", element: <ShopPage /> },
          { path: "/about", element: <Pages /> },  
      { path: "/shop/:id", element: <SingleProduct /> },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
]);

export default router;