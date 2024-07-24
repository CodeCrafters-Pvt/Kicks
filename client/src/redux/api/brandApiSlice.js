import { apiSlice } from "./apiSlice";

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBrands: builder.query({
      query: () => ({
        url: "/brand/allBrands",
        method: "GET",
      }),
      providesTags: ["brand"],
    }),
    getBrandById: builder.query({
      query: (brandId) => ({
        url: `/brand/getBrand/${brandId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "brand", id: result.brandId }] : ["brand"],
    }),
    createBrand: builder.mutation({
      query: (brandDetails) => ({
        url: "/brand/createBrand",
        method: "POST",
        body: brandDetails,
      }),
      invalidatesTags: ["brand","enums"],
    }),
    updateBrand: builder.mutation({
      query: ({ brandId, ...updatedDetails }) => ({
        url: `/brand/updateBrand/${brandId}`,
        method: "PUT",
        body: updatedDetails,
      }),
      invalidatesTags: (result, error, { brandId }) => [
        { type: "brand", id: brandId },
      ],
    }),
    deleteBrand: builder.mutation({
      query: (brandId) => ({
        url: `/brand/deleteBrand/${brandId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { brandId }) => [
        { type: "brand", id: brandId },
      ],
    }),
  }),
});

export const {
  useFetchBrandsQuery,
  useGetBrandByIdQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApiSlice;
