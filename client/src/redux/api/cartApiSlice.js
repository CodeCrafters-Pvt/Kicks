import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getCartProducts: builder.query({
        query: () => "/cart/get-all-cart-products",
        providesTags: (result, error, arg) => [
          { type: "cart", id: "cart" },
          result
            ? [...result.map(({ id }) => ({ type: "cart", id })), "cart"]
            : ["cart"],
        ],
      }),
    }),
  });
  
  export const {
    useGetCartProductsQuery
  } = cartApiSlice;