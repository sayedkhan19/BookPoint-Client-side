import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://book-point-server.vercel.app",
});

export default axiosPublic;
