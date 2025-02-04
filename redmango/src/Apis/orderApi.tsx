import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7181/api/",
    }),
    endpoints: (builder) => ({
        initiatePayment : builder.mutation({
            query: (orderDetails) => ({
                url: "order",
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: orderDetails,
            }),
        }),
    }),
});

export const { useInitiatePaymentMutation } = orderApi;
export default orderApi;