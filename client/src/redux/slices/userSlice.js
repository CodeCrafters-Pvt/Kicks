// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
// import { apiSlice } from "../api/apiSlice";
// import toast from "react-hot-toast";

// const token = JSON.parse(localStorage.getItem("user"))?.token;

// export const requestOtp = createAsyncThunk(
//   'user/requestOtp',
//   async (values, { rejectWithValue }) => {
//     try {
//       const data = { email: values.email, userName: values.userAccount.username };
//       const response = await axios.post("http://localhost:3001/users/signup/verify", data,
//       {
//         headers:{
//           'Authorization' : `Bearer ${token}`
//         }
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.error);
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   'user/registerUser',
//   async (reqData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://localhost:3001/users/signup", reqData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.error);
//     }
//   }
// );

// export const userSlice = createSlice({
//   name: 'user',
//   initialState:null,
//   reducers: {

//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(requestOtp.pending, () => {
//         toast.dismiss()
//         toast.loading('Loading...');
//       })
//       .addCase(requestOtp.fulfilled, (state, action) => {
//         toast.dismiss()
//         toast.success(action.payload.message);
//       })
//       .addCase(requestOtp.rejected, (state, action) => {
//         toast.dismiss()
//         toast.error(action.payload);
//       })
//       .addCase(registerUser.pending, () => {
//         toast.dismiss()
//         toast.loading('Loading...');
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         toast.dismiss()
//         toast.success(action.payload);
//         const user = { email: action.payload.email, token: action.payload.token };
//         localStorage.setItem('user', JSON.stringify(user));
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         toast.dismiss()
//         toast.error(action.payload);
//       });
//   }
// });

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import toast from "react-hot-toast";

const token = JSON.parse(localStorage.getItem("user"))?.token;
const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
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
} = extendedApiSlice;

export const selectUsersData = (state) =>
  state.api.endpoints.getUsers.useQueryState().data ?? [];

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) || initialState
);
