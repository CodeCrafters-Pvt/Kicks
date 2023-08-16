import { configureStore} from '@reduxjs/toolkit'
import { userSlice,authSlice } from './reducers'


export const store =configureStore({
    reducer: {
        user:userSlice.reducer,
        auth:authSlice.reducer,
    },
})

