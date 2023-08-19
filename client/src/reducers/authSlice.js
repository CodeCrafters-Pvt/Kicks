import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import toast from 'react-hot-toast';


export const login = createAsyncThunk(
  'auth/login',
  async (values, { rejectWithValue }) => {
    toast.dismiss()
    toast.loading('verifying...');
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
    toast.dismiss()
    toast.loading('loading...');
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
    toast.dismiss()
    toast.loading('loading...');
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
  initialState:{ user:null },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        toast.dismiss()
        const user = { email: action.payload.email, token: action.payload.token };
        localStorage.setItem('user', JSON.stringify(user));
        state.user=action.payload.userDetails;
        toast.success(action.payload.message);
      })
      .addCase(login.rejected, (state, action) => {
        toast.dismiss()
        toast.error(action.payload);
      })
      .addCase(reqResetPassword.fulfilled, (state, action) => {
        toast.dismiss()
        toast.success(action.payload.message);
      })
      .addCase(reqResetPassword.rejected, (state, action) => {
        toast.dismiss()
        toast.error(action.payload);
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



