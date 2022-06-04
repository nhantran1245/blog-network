import api_helper from "../../services/api_helper";

export const loginApi = (payload) => {
  return api_helper
    .post("/auth/login", null, payload)
    .then((response) => response.data)
    .catch((err) => err);
};

export const fetchCurrentUser = () => {
  return api_helper
    .get("/auth/current-user")
    .then((res) => res.data)
    .catch((err) => err);
};
