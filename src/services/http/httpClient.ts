import axios from "axios";

export const baseURL = "http://localhost:3000";

const client = axios.create({
  baseURL: `${baseURL}/api/v1/`,
});

export default client;
