import axios from "axios";

const baseURL = "http://192.168.1.8:3000";

export const client = axios.create({
  baseURL: `${baseURL}/api/v1/`,
  timeout: 30000,
});
