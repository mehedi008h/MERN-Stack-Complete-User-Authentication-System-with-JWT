import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mernauth08h.herokuapp.com/",
});
