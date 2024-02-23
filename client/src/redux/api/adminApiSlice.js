import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getAdmins: builder.query({
        query: () => "/admin/all",
        providesTags: (result, error, arg) => [
          { type: "admins", id: "admins" },
          result
            ? [...result.map(({ id }) => ({ type: "admin", id })), "admin"]
            : ["admin"],
        ],
      }),
      registerAdmin: builder.mutation({
        query: (data) => ({
          url: "/admin/signup",
          method: "POST",
          body: data,
        }),
        invalidatesTags: [{ type: "admins", id: "admins" }],
      }),
      requestOtp: builder.mutation({
        query: (data) => ({
          url: "/auth/request-otp/admin",
          method: "POST",
          body: data,
        }),
      }),
    }),
  });
  
  export const {
    useGetAdminsQuery,
    useRegisterAdminMutation,
    useRequestOtpMutation,
  } = adminApiSlice;