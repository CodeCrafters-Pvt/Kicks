import { apiSlice } from "./apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllCarts: builder.query({
      query: () => ({
        url: '/cart/allCarts',
        method: 'GET',
      }),
      providesTags: (result) => result ? [{ type: 'carts', id: 'allCarts' }] : ['carts'],
    }),
    getUserCart: builder.query({
      query: userID => ({
        url: `/cart/getUserCart/${userID}`,
        method: 'GET',
      }),
      providesTags: (result) => result ? [{ type: 'cart', id: result.userID }] : ['cart'],
    }),
    addProductToCart: builder.mutation({
      query: productDetails => ({
        url: '/cart/addProduct',
        method: 'POST',
        body: productDetails,
      }),
      invalidatesTags: (result, error, { userID }) => [{ type: 'cart', id: userID }],
    }),
    removeProductFromCart: builder.mutation({
      query: productDetails => ({
        url: '/cart/removeProduct',
        method: 'DELETE',
        body: productDetails,
      }),
      invalidatesTags: (result, error, { userID }) => [{ type: 'cart', id: userID }],
    }),
    addProductsToCart: builder.mutation({
      query: productsDetails => ({
        url: '/cart/addProduct/multiple',
        method: 'POST',
        body: productsDetails,
      }),
      invalidatesTags: (result, error, { userID }) => [{ type: 'cart', id: userID }],
    }),
    removeProductsFromCart: builder.mutation({
      query: productsDetails => ({
        url: '/cart/removeProduct/multiple',
        method: 'DELETE',
        body: productsDetails,
      }),
      invalidatesTags: (result, error, { userID }) => [{ type: 'cart', id: userID }],
    }),
    clearCart: builder.mutation({
      query: userID => ({
        url: '/cart/clearCart',
        method: 'DELETE',
        body: { userID },
      }),
      invalidatesTags: (result, error, { userID }) => [{ type: 'cart', id: userID }],
    }),
  }),
});

export const {
  useGetAllCartsQuery,
  useGetUserCartQuery,
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation,
  useAddProductsToCartMutation,
  useRemoveProductsFromCartMutation,
  useClearCartMutation,
} = cartApiSlice;
