import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    challenges: [], 
    challenge: null,  
    adminViewChallenge: null,
    challengeOftheDay: null,
    answers: [],
    loading: false,
    error: null,
  };
  
  const challengeSlice = createSlice({
    name: "challenge",
    initialState: initialState,
    reducers: {
      setLoading(state, action) {
        state.loading = action.payload;
      },
      setChallenges(state, action) {
        state.challenges = action.payload; 
      },
      setChallengeOftheDay(state, action) {
        state.challengeOftheDay = action.payload; 
      },
      setChallengeCreated(state, action) {
        state.challenge = action.payload;
      },
      setAdminViewChallenge(state, action) {
        state.adminViewChallenge = action.payload;
      },
      setChallengeAnswers(state, action) {
        state.answers = action.payload;  
      },
      setError(state, action) {
        state.error = action.payload;
      },
      clearError(state) {
        state.error = null;
      },
    },
  });
  
  export const { 
    setLoading, 
    setChallenges, 
    setChallengeCreated, 
    setAdminViewChallenge, 
    setChallengeAnswers, 
    setChallengeOftheDay, 
    setError, 
    clearError 
  } = challengeSlice.actions;
  
  export default challengeSlice.reducer;