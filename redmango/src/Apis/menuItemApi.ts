
//API integration is handled using Redux Toolkit Query (RTK Query). This file defines an API slice using RTK Query's createApi method. 
// It provides a clean and efficient way to fetch data from the backend and manage caching, state updates, and invalidation.
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//--1. createApi: This is the primary function from RTK Query used to define the API slice. It integrates the Redux store with API calls.

//--2. reducerPath: The name of the slice in the Redux store where the API state is stored. 

//--3. The fetchBaseQuery is a simple wrapper around the native fetch API, used to make HTTP requests.

//--4. tagTypes: An array of tags used to manage cache, invalidation and updates. The ["MenuItems"] tag is used to label cached data related to menu items.

//--5. endpoints: A function to define all the API endpoints (queries and mutations). Each endpoint corresponds to a specific API route and provides hooks to interact with it.

const menuItemApi = createApi({
    reducerPath: "menuItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7181/api/"
    }),
    tagTypes: ["MenuItems"],
    endpoints: (builder) => ({
        getMenuItems : builder.query({
            query: () => ({
                url: "menuItem"
            }),
            providesTags:["MenuItems"]
        }),
        getMenuItemById : builder.query({
            query: (id) => ({
                url: `menuItem/${id}`,
            }),
            providesTags:["MenuItems"]
        })
    }),
});

//RTK Query hooks (useGetMenuItemsQuery, useGetMenuItemByIdQuery) are used to fetch data from APIs.
export const {useGetMenuItemsQuery, useGetMenuItemByIdQuery} = menuItemApi;
export default menuItemApi;