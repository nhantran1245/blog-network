import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    currentBlog: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    callBlogApi: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getBlogsSuccess: (state, action) => {
      state.blogs = state.blogs.concat(action.payload);
      state.isLoading = false;
    },
    callBlogApiFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    loadMoreBlog: (state, action) => {
      state.blogs = state.blogs.concat(action.payload);
    },
    createBlogSuccess: (state, action) => {
      state.blogs = [action.payload, ...state.blogs];
      state.isLoading = false;
    },
    createBlogFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    getBlogDetailsSuccess: (state, action) => {
      state.currentBlog = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  loadMoreBlog,
  callBlogApi,
  getBlogsSuccess,
  callBlogApiFail,
  createBlogSuccess,
  getBlogDetailsSuccess,
} = blogSlice.actions;
export const selectBlogs = (state) => state.blog.blogs;
export const selectBlogStore = (state) => state.blog;
export default blogSlice.reducer;
