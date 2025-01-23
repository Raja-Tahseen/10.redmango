import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";

const store = configureStore({
    reducer: {
        menuItemStore: menuItemReducer,
    },
});

//working with TypeScript, we basically have to export the root state and that will be the type of store state.
export type RootState = ReturnType<typeof store.getState>;
export default store;