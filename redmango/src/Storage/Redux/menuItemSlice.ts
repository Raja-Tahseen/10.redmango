//-- menuItemSlice.ts manages menu item data in the global state.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuItem: [],//An array to store fetched menu items.
};

export const menuItemSlice = createSlice({
    name: "MenuItem",
    initialState: initialState,
    reducers:{
        setMenuItem: (state,action) => {//Updates the menuItem state with fetched data.
            state.menuItem = action.payload;
        },
    },
});

export const { setMenuItem } = menuItemSlice.actions;
export const  menuItemReducer  = menuItemSlice.reducer;