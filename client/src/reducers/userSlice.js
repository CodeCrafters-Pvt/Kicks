import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import toast from 'react-hot-toast';

const token=JSON.parse(localStorage.getItem('user'))?.token;

export const requestOtp = createAsyncThunk(
  'user/requestOtp',
  async (values, { rejectWithValue }) => {
    toast.dismiss()
    toast.loading('Loading...');
    try {
      const data = { email: values.email, userName: values.userAccount.username };
      const response = await axios.post("http://localhost:3001/users/signup/verify", data,
      {
        headers:{
          'Authorization' : `Bearer ${token}`
        }
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (reqData, { rejectWithValue }) => {
    toast.dismiss()
    toast.loading('Loading...');
    try {
      const response = await axios.post("http://localhost:3001/users/signup", reqData,
      {
        headers:{
          'Authorization' : `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState:null,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOtp.fulfilled, (state, action) => {
        toast.dismiss()
        toast.success(action.payload.message);
      })
      .addCase(requestOtp.rejected, (state, action) => {
        toast.dismiss()
        toast.error(action.payload);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        toast.dismiss()
        toast.success(action.payload);
        const user = { email: action.payload.email, token: action.payload.token };
        localStorage.setItem('user', JSON.stringify(user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        toast.dismiss()
        toast.error(action.payload);
      });
  }
});


