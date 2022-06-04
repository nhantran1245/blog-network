import axios from "axios";
import { LOCAL_BASE_URL } from "./../utils/constants";

export default axios.create({
  baseURL: LOCAL_BASE_URL,
});
