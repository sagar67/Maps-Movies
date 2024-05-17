import { configureStore } from "@reduxjs/toolkit";
import usernameSlice from './username'

export const store = configureStore({
    reducer:{
        user: usernameSlice
    }
})