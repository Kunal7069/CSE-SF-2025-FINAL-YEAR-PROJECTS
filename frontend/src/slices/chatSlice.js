import { createSlice } from "@reduxjs/toolkit";

// Initial state for chat
const initialState = {
  messages: [],
  loading: false,
};

// Create the chat slice
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

// Export actions from the slice
export const { setLoading, setMessages, addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;