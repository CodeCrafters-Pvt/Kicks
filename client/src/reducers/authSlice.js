import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import toast from 'react-hot-toast';


export const login = createAsyncThunk(
  'auth/login',
  async (values, { rejectWithValue }) => {
    try {
      const data = { email: values.email, password: values.password };
      const response = await axios.post("http://localhost:3001/auth/login",data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const reqResetPassword = createAsyncThunk(
  'auth/reqResetPassword',
  async (values, { rejectWithValue }) => {
    try {
      const data = { email: values.email };
      const response = await axios.post("http://localhost:3001/auth/request-reset-password",data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (values, { rejectWithValue }) => {
    try {
      const data = { resetToken: values.resetToken,newPassword:values.newPassword };
      console.log(data)
      const response = await axios.post("http://localhost:3001/auth/reset-password",data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);



export const authSlice = createSlice({
  name: 'auth',
  initialState:{ user:null,token:null },
  reducers: {
    setCredentials:(state,action)=>{
      const {user,accessToken} =action.payload
      state.user =user;
      state.token=accessToken;
    },
    logOut:(state,action)=>{
      state.user=null
      state.token=null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, () => {
        toast.dismiss()
        toast.loading('verifying...');
      })
      .addCase(login.fulfilled, (state, action) => {
        toast.dismiss()
        const user = { email: action.payload.email, token: action.payload.token };
        localStorage.setItem('user', JSON.stringify(user));
        state.user=action.payload.user;
        toast.success(action.payload.message);
      })
      .addCase(login.rejected, (state, action) => {
        toast.dismiss()
        toast.error(action.payload);
      })
      .addCase(reqResetPassword.pending, () => {
        toast.dismiss()
        toast.loading('loading...');
      })
      .addCase(reqResetPassword.fulfilled, (state, action) => {
        toast.dismiss()
        toast.success(action.payload.message);
      })
      .addCase(reqResetPassword.rejected, (state, action) => {
        toast.dismiss()
        toast.error(action.payload);
      })
      .addCase(resetPassword.pending, () => {
        toast.dismiss()
        toast.loading('loading...');
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        toast.dismiss()
        toast.success(action.payload.message);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        toast.dismiss()
        toast.error(action.payload);
      })
  }
});

export const {setCredentials,logOut} =authSlice.actions

export default authSlice.reducer

export const selectCurrentUser=(state)=>state.auth.user;
export const selectCurrentToken=(state)=>state.auth.token;



