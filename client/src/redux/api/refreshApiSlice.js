import { apiSlice } from "./apiSlice";

export const refreshApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    refreshToken: builder.mutation({
      query: () => ({
        url: '/refresh',
        method: 'GET',
      }),
    }),
  })
});

export const {
  useRefreshTokenMutation
} = refreshApiSlice;
