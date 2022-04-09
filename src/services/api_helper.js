import ApiInstance from "./axios_helper";

const token = localStorage.getItem("access-token");
const config = {
  headers: token ? {
    "Authorization": "Bearer " + token,
    "Access-Control-Allow-Origin": "*"
  } : {
    "Access-Control-Allow-Origin": "*"
  },
}
export default {
  get: (url, params) => ApiInstance.get(url, { ...config, params }),
  post: (url, params, body) => ApiInstance.post(url, body, { ...config, params }),
  put: () => {

  },
  delete: () => {

  }
}