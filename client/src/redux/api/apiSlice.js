import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials,logOut } from "../slices/authSlice";

const baseQuery=fetchBaseQuery({ 
  baseUrl: "http://localhost:3001",
  credentials:'include',
  prepareHeaders:(headers,{getState})=>{
    const token =getState().auth.token
    if(token){
      headers.set("authorization",`Bearer ${token}`)
    }
  }
})

const baseQuerywithReauth =async (args,api,extraOptions)=>{
  let result = await baseQuery(args,api,extraOptions)
  if(result?.error?.originalStatus===403){
    console.log("sending refresh token")
    const refreshResult=await baseQuery('/refresh',api,extraOptions)
    console.log(refreshResult)
    if(refreshResult?.data){
      const user=api.getState().auth.user
      api.dispatch(setCredentials({...refreshResult.data,user}))
      result = await baseQuery(args,api,extraOptions)
    }
    else{
      api.dispatch(logOut())
    }
  }
  return result;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery:baseQuerywithReauth,
  endpoints: () => ({}),
}); 




