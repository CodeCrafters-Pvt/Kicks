import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
  name:'auth',
  initialState:{ user:null,token:null },
  reducers:{
    setCredentials:(state,action)=>{
      const {user,token} =action.payload
      state.user = user
      state.token = token
      document.cookie=`auth_token=${token};path=/`
    },
    logOut:(state,action)=>{
      state.user = null
      state.token = null
      document.cookie="auth_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
  },
})


export const { setCredentials,logOut}=authSlice.actions;

export default authSlice.reducer

export const selectCurrentUser=(state)=>state.auth.user
export const selectCurrentToken=(state)=>state.auth.token


