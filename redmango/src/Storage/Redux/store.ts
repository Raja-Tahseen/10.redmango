import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import { menuItemApi } from "../../Apis";

const store = configureStore({
    reducer: {
        menuItemStore: menuItemReducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(menuItemApi.middleware),
});

//working with TypeScript, we basically have to export the root state and that will be the type of store state.
export type RootState = ReturnType<typeof store.getState>;
export default store;