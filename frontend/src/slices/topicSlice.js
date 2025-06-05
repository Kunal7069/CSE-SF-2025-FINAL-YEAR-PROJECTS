import { createSlice } from "@reduxjs/toolkit";

const topicSlice = createSlice({
  name: "topics",
  initialState: {
    topics: [],
  },
  reducers: {
    addTopic: (state, action) => {
      state.topics.push(action.payload);
    },
    updateTopic: (state, action) => {
      const index = state.topics.findIndex(topic => topic._id === action.payload._id);
      if (index !== -1) {
        state.topics[index] = action.payload;
      }
    },
    deleteTopic: (state, action) => {
      state.topics = state.topics.filter(topic => topic._id !== action.payload);
    },
    setTopics: (state, action) => {
      state.topics = action.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { addTopic, updateTopic, deleteTopic, setTopics,setLoading } = topicSlice.actions;

export default topicSlice.reducer;
