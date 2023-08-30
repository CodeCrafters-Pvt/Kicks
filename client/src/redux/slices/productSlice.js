import { createSlice } from "@reduxjs/toolkit";

export const productSlice=createSlice({
  name:'product',
  initialState:{products:[]},
  reducers:{
   addProduct:(state,action)=>{
    state.products=[...state.products,...action.payload]
  },
  removeProduct :(state , action) =>{
    state.products=state.products.filter((_, i) => i !== action.payload);
  }
}})


export const { addProduct,removeProduct}=productSlice.actions;

export default productSlice.reducer

