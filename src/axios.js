import axios from "axios";

axios.defaults.withCredentials = true;
//axios.defaults.baseURL = "http://54.91.184.74:8080/audit/";
axios.defaults.baseURL = "http://localhost:8080/api/";


export default axios;