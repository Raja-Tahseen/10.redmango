//-- shoppingCartSlice.ts manages menu item data in the global state.
import { createSlice } from "@reduxjs/toolkit";
import { shoppingCartModel } from "../../Interfaces";

const initialState: shoppingCartModel = {
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
    updateQuantity: (state, action) => {
      //payload will have cartitem that needs to be updated with new quantity
      state.cartItems = state.cartItems?.map((item) => {
        if (item.id === action.payload.cartItem.id) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      //payload will have cartitem that needs to be removed from cart
      state.cartItems = state.cartItems?.filter((item) => {
        if (item.id === action.payload.cartItem.id) {
          return null;
        }
        return item;
      });
    },
  },
});

export const { setShoppingCart, updateQuantity, removeFromCart } =
  shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
