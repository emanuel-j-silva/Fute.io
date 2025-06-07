import axios from "axios";
import { getToken } from "../storage/token";
import { API_BASE_URL } from "@env";

const LOGIN_PATH = "/auth/login";
const REGISTER_PATH = "/auth/register";

const api = axios.create({
    baseURL: API_BASE_URL
});

api.interceptors.request.use(
    async(config)=>{
        if (config.url === LOGIN_PATH || config.url === REGISTER_PATH) {
            console.log("AXIOS INTERCEPTOR: Skipping Authorization header for auth request.");
            return config;
        }

        const token = await getToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;