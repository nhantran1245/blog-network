import api_helper from "../../services/api_helper";

export const fetchBlogs = async () => {
  return api_helper
    .get("/api/blog/6/1")
    .then((response) => response.data)
    .catch((err) => err);
};

export const createNewBlog = async (payload) => {
  return api_helper
    .post("/api/blog", null, payload)
    .then((response) => response.data)
    .catch((err) => err);
};

export const getBlogDetails = async (payload) => {
  return api_helper
    .get(`/api/blog/${payload.id}`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const likeBlogApi = async (payload) => {
  return api_helper
    .put(`/api/blog/${payload.id}/like-blog`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const unlikeBlogApi = async (payload) => {
  return api_helper
    .put(`/api/blog/${payload.id}/unlike-blog`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const addCommentBlogApi = async (payload) => {
  return api_helper
    .post(`/api/blog/${payload.id}/comment`, null, payload.payload)
    .then((res) => res.data)
    .catch((err) => err);
};
