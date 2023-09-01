import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getUsers: builder.query({
        query: () => "/users/allUsers",
        providesTags: (result, error, arg) => [
          { type: "users", id: "users" },
          result
            ? [...result.map(({ id }) => ({ type: "user", id })), "user"]
            : ["user"],
        ],
      }),
      registerUser: builder.mutation({
        query: (data) => ({
          url: "/users/signup",
          method: "POST",
          body: data,
        }),
        invalidatesTags: [{ type: "users", id: "users" }],
      }),
      requestOtp: builder.mutation({
        query: (data) => ({
          url: "/users/signup/verify",
          method: "POST",
          body: data,
        }),
      }),
    }),
  });
  
  export const {
    useGetUsersQuery,
    useRegisterUserMutation,
    useRequestOtpMutation,
  } = usersApiSlice;