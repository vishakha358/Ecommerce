import { createSlice } from "@reduxjs/toolkit";

// ✅ Load user & token from localStorage (if available)
const loadUserFromLocalStorage = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    return {
      user: user || null,
      token: token || null,
    };
  } catch (error) {
    return {
      user: null,
      token: null,
    };
  }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

// ✅ Export actions and reducer
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
