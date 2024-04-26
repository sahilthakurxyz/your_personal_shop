import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.productId === item.productId
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.productId === isItemExist.productId ? item : i
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.productId !== item.id);
    },
    shippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    removeAllFromCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});
export const { addToCart, removeFromCart, shippingInfo, removeAllFromCart } =
  cartSlice.actions;
export const addCartReducer = cartSlice.reducer;
