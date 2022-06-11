import { call, put, takeEvery } from "redux-saga/effects";
import {
  loadMoreBlog,
  callBlogApiFail,
  createBlogSuccess,
  getBlogDetailsSuccess,
  callBlogApi,
} from "./blogSlice";
import {
  fetchBlogs,
  createNewBlog,
  getBlogDetails,
  likeBlogApi,
  unlikeBlogApi,
  addCommentBlogApi,
} from "./blogApi";

export function* getBlogList() {
  try {
    yield put(callBlogApi());
    const blogs = yield call(fetchBlogs);
    yield put(loadMoreBlog(blogs.data));
  } catch {
    yield put(callBlogApiFail());
  }
}

export function* createBlog(action) {
  try {
    yield put(callBlogApi());
    const blog = yield call(createNewBlog, action.payload);
    yield put(createBlogSuccess(blog));
  } catch {
    yield put(callBlogApiFail());
  }
}

export function* getBlogDetailById(action) {
  try {
    yield put(callBlogApi());
    const blog = yield call(getBlogDetails, action.payload);
    yield put(getBlogDetailsSuccess(blog));
  } catch {
    yield put(callBlogApiFail());
  }
}

export function* likeBlog(action) {
  try {
    yield put(callBlogApi());
    const blog = yield call(likeBlogApi, action.payload);
    yield put({type: "GET_BLOG_DETAILS", payload: { id: blog._id } });
  } catch {
    yield put(callBlogApiFail());
  }
}

export function* unlikeBlog(action) {
  try {
    yield put(callBlogApi());
    const blog = yield call(unlikeBlogApi, action.payload);
    yield put({type: "GET_BLOG_DETAILS", payload: { id: blog._id } });
  } catch {
    yield put(callBlogApiFail());
  }
}

export function* addCommentBlog(action) {
  try {
    yield put(callBlogApi());
    const blog = yield call(addCommentBlogApi, action.payload);
    yield put({type: "GET_BLOG_DETAILS", payload: { id: blog._id } });
  } catch {
    yield put(callBlogApiFail());
  }
}

export function* blogSaga() {
  yield takeEvery("LOAD_MORE_BLOGS", getBlogList);
  yield takeEvery("CREATE_BLOG", createBlog);
  yield takeEvery("GET_BLOG_DETAILS", getBlogDetailById);
  yield takeEvery("LIKE_BLOG", likeBlog);
  yield takeEvery("UNLIKE_BLOG", unlikeBlog);
  yield takeEvery("ADD_COMMENT", addCommentBlog);
}
