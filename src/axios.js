import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://44.208.22.32:8080/audit/api";
//axios.defaults.baseURL = "http://localhost:8080/api/";


export default axios;