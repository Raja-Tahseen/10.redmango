//-- shoppingCartSlice.ts manages menu item data in the global state.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], //An array to store fetched cart items.
};

export const shoppingCartSlice = createSlice({
  name: "cartItems",
  initialState: initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      //Updates the cartItems state with fetched data.
      state.cartItems = action.payload;
    },
  },
});

export const { setShoppingCart } = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
