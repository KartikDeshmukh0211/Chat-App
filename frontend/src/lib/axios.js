import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // IT WILL SEND COOKIES IN EVERY SINGLE REQUEST
});
