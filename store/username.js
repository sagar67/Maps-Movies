import { createSlice } from "@reduxjs/toolkit";

const usernameSlice = createSlice({
    name:'login',
    initialState:{
        username:'',
        password:'',
    },
    reducers:{
        username(state,action){
            state.username = state.username + action.payload;
            state.password = state.password + action.payload;
        }
    }
})

export const usernameActions = usernameSlice.actions;

export default usernameSlice.reducer;