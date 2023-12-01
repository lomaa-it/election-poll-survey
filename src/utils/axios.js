import axios from "axios";
import { baseServerUrl } from "./apis";

const instance = axios.create({
  baseURL: baseServerUrl,
});
// instance.defaults.headers.common["Accept"] = "application/json";

export default instance;
