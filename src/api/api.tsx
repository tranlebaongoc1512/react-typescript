import axios from "axios";

const url = "https://6499354079fbe9bcf83ec484.mockapi.io";
const instance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;