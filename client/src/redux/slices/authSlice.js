import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
  name:'auth',
  initialState:{ user:null,token:null },
  reducers:{
    setCredentials:(state,action)=>{
      const {user,token} =action.payload
      const storageItem= { email: user.email, token}
      state.user = user
      state.token = token
      localStorage.setItem("user", JSON.stringify(storageItem));
    },
    logOut:(state,action)=>{
      state.user = null
      state.token = null
      localStorage.removeItem("user");
    }
  },
})


export const { setCredentials,logOut}=authSlice.actions;

export default authSlice.reducer

export const selectCurrentUser=(state)=>state.auth.user
export const selectCurrentToken=(state)=>state.auth.token


