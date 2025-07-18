import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Features/cart/cartSlice";
import { authApi } from "./Features/auth/authApi";
import authReducer from "./Features/auth/authSlice";
import productsApi from "./Features/products/productsApi"; // ✅ FIXED
import reviewApi from "./Features/reviews/reviewsApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, ),
});
