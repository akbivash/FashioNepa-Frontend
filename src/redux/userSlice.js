import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
   currentUser:null,
   isFetching:false,
   error:false ,
  },
  reducers: {
    registerStart:((state)=>{
    state.isFetching = true
    state.error = false
    }),
    registerSuccess:((state, action) => {
state.isFetching = false
state.error = false
state.currentUser = action.payload.data 
    }),
    registerFailure:((state)=> {
state.isFetching = false
state.error = true
    }),
   loginStart:(state => {
    state.isFetching = true
   }),
   loginSuccess:((state, action) => {
    state.isFetching = false 
    state.currentUser = action.payload.data
    state.error = false
   }),
   loginFailure:(state => {
    state.isFetching = false 
    state.error = true
   }),
  
 
  logoutSuccess:((state) => {
state.isFetching = false 
state.error  = false
state.currentUser = null
  })
}
});

export const { loginStart, loginSuccess, loginFailure, registerStart,registerSuccess,registerFailure, logoutStart, logoutSuccess, logoutFailure } = userSlice.actions;
export default userSlice.reducer;
