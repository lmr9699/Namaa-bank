import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({
  baseURL: "https://bank-app-be-eapi-btf5b.ondigitalocean.app",
});

instance.interceptors.request.use(async (req) => {
  const token = await getToken();

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default instance;
