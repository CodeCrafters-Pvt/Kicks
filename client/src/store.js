import { configureStore } from '@reduxjs/toolkit'
import { userSlice,authSlice } from './reducers'


export const store =configureStore({
    reducer: { 
        auth:authSlice.reducer,
        user:userSlice.reducer,
    },
    devTools:true,

})

