import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
   currentUser:null,
   isFetching:false,
   error:false 
  },
  reducers: {
    registerStart:(state)=>{
    state.isFetching = true
    },
    registerSuccess:(state, action) => {
state.isFetching = false
state.currentUser = action.payload.data 
    },
    registerFailure:state=> {
state.isFetching = false
state.error = true
    },
   loginStart:(state => {
    state.isFetching = true
   }),
   loginSuccess:((state, action) => {
    state.isFetching = false 
    state.currentUser = action.payload.data
   }),
   loginFailure:(state => {
    state.isFetching = false 
    state.error = true
   })
  },
});

export const { loginStart, loginSuccess, loginFailure, registerStart,registerSuccess,registerFailure } = userSlice.actions;
export default userSlice.reducer;
