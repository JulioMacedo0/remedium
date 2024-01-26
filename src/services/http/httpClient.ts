import axios from "axios";

const baseURL = "http://192.168.100.176:3000";

export const client = axios.create({
  baseURL: `${baseURL}/api/v1/`,
});
