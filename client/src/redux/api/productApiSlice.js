import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateID: builder.query({
      query: () => ({
        url: "/product/generate-ID",
        method: "GET",
      }),
      providesTags: ["productId"],
    }),
    fetchEnums: builder.query({
      query: () => ({
        url: "/product/enums",
        method: "GET",
      }),
      providesTags: ["enums"],
    }),
    createProduct: builder.mutation({
      query: (productDetails) => ({
        url: "/product/createProduct",
        method: "POST",
        body: productDetails,
      }),
      invalidatesTags: ["products", "productId"],
    }),
    addStockToProduct: builder.mutation({
      query: (stockDetails) => ({
        url: "/product/addStock",
        method: "POST",
        body: stockDetails,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "product", id: productId },
      ],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "/product/allProducts",
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "products", id: "allProducts" }] : ["products"],
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `/product/getProduct/${productId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "product", id: result.productId }] : ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/product/deleteProduct/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "product", id: productId },
        "productId",
      ],
    }),
  }),
});

export const {
  useGenerateIDQuery,
  useFetchEnumsQuery,
  useCreateProductMutation,
  useAddStockToProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
} = productApiSlice;
