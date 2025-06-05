// Add a new reducer action to remove the blog
import { createSlice } from "@reduxjs/toolkit";
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    loading: false,
    error: null,
    blogCreated: null,
    pendingBlogs: [],
    publishedBlogs: [],
    adminPendingBlogs: [],
    adminPublishedBlogs: [],
    blogEdit: null,
    blog: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setBlogCreated(state, action) {
      state.blogCreated = action.payload;
    },
    setPendingBlogs(state, action) {
      state.pendingBlogs = action.payload || [];
    },
    setPublishedBlogs(state, action) {
      state.publishedBlogs = action.payload || [];
    },
    setAdminPendingBlogs(state, action) {
      state.adminPendingBlogs = action.payload || [];
    },
    setAdminPublishedBlogs(state, action) {
      state.adminPublishedBlogs = action.payload || [];
    },
    setBlogEdit(state, action) {
      state.blogEdit = action.payload;
    },
    setBlog(state, action) {
      state.blog = action.payload;
    },
    removeBlog(state, action) {
      const blogId = action.payload;
      state.pendingBlogs = state.pendingBlogs.filter((blog) => blog._id !== blogId);
      state.adminPendingBlogs = state.adminPendingBlogs.filter((blog) => blog._id !== blogId);
    },
  },
});

export const {
  setLoading,
  setError,
  setBlogCreated,
  setPendingBlogs,
  setPublishedBlogs,
  setAdminPendingBlogs,
  setAdminPublishedBlogs,
  setBlogEdit,
  setBlog,
  removeBlog, 
} = blogSlice.actions;

export default blogSlice.reducer;
