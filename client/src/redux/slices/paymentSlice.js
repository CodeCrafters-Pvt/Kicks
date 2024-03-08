import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentConfig: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentConfig(state, action) {
      state.paymentConfig = action.payload;
    },
  },
});

export const { setPaymentConfig }=paymentSlice.actions;

export default paymentSlice.reducer


export const getPaymentConfig = (state) => state.payment.paymentConfig;
