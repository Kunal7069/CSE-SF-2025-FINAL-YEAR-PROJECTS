import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
      setSignupData(state, action) {
        state.signupData = action.payload;
      },
      setLoading(state, action) {
        state.loading = action.payload;
      },
      setToken(state, action) {
        state.token = action.payload;
        
        // Save token to localStorage
        localStorage.setItem("token", JSON.stringify(action.payload));
        
      
      },
    }
  });

export const {setToken,setLoading,setSignupData}=authSlice.actions;
export default authSlice.reducer;