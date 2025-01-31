import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { userAuthReducer } from "./userAuthSlice";
import { authApi, menuItemApi, shoppingCartApi } from "../../Apis";

const store = configureStore({
    reducer: {
        menuItemStore: menuItemReducer,//Manages the local state of menu items.
        shoppingCartStore: shoppingCartReducer,
        userAuthStore: userAuthReducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer,//Handles API-related state using RTK Query.
        [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
        [authApi.reducerPath]: authApi.reducer,        
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
    .concat(menuItemApi.middleware)
    .concat(authApi.middleware)
    .concat(shoppingCartApi.middleware),//Default middleware is extended to include menuItemApi.middleware for handling API caching and invalidation.
});

//working with TypeScript, we basically have to export the root state and that will be the type of store state.
export type RootState = ReturnType<typeof store.getState>;
export default store;