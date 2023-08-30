import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query({
        query: () => "/products",
        providesTags: (result, error, arg) => [
          { type: "products", id: "products" },
          result
            ? [...result.map(({ id }) => ({ type: "product", id })), "product"]
            : ["product"],
        ],
      }),
      addProduct: builder.mutation({
        query: (data) => ({
          url: "/products",
          method: "POST",
          body: data,
        }),
        invalidatesTags: [{ type: "products", id: "products" }],
      }),
    }),
  });
  
  export const {
   useGetProductsQuery,
   useAddProductMutation
  } = productApiSlice