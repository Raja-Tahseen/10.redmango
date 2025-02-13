//-- menuItemSlice.ts manages menu item data in the global state.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuItem: [], //An array to store fetched menu items.
  search:""
};

export const menuItemSlice = createSlice({
  name: "MenuItem",
  initialState: initialState,
  reducers: {
    setMenuItem: (state, action) => {
      //Updates the menuItem state with fetched data.
      state.menuItem = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    }
  },
});

export const { setMenuItem, setSearchItem } = menuItemSlice.actions;
export const menuItemReducer = menuItemSlice.reducer;
