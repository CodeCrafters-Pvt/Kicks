import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createProduct: builder.mutation({
      query: productDetails => ({
        url: '/product/createProduct',
        method: 'POST',
        body: productDetails,
        invalidatesTags: ['products'],
      }),
    }),
    addStockToProduct: builder.mutation({
      query: stockDetails => ({
        url: '/product/addStock',
        method: 'POST',
        body: stockDetails,
        invalidatesTags: (result, error, { productId }) => [{ type: 'product', id: productId }],
      }),
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: '/product/allProducts',
        method: 'GET',
        providesTags: (result) => result ? [{ type: 'products', id: 'allProducts' }] : ['products'],
      }),
    }),
    getProductById: builder.query({
      query: productId => ({
        url: `/product/getProduct/${productId}`,
        method: 'GET',
        providesTags: (result) => result ? [{ type: 'product', id: productId }] : ['product'],
      }),
    }),
    deleteProduct: builder.mutation({
      query: productId => ({
        url: `/product/deleteProduct/${productId}`,
        method: 'DELETE',
        invalidatesTags: (result, error, { productId }) => [{ type: 'product', id: productId }],
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useAddStockToProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
} = productApiSlice;
