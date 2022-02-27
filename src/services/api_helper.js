import ApiInstance from "./axios_helper";

const token = localStorage.getItem("access-token");
const config = {
  headers: {
    "Authorization": "Bearer " + token
  }
}
export default {
  get: (url, params) => ApiInstance.get(url, { ...config, params }),
  post: (url, params, body) => ApiInstance.get(url, { ...config, params }, body),
  put: () => {

  },
  delete: () => {

  }
}