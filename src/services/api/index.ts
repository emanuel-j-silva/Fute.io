import axios from "axios";
import { getToken } from "../storage/token";
import { API_BASE_URL } from "@env";

const api = axios.create({
    baseURL: API_BASE_URL
});

api.interceptors.request.use(
    async(config)=>{
        const token = await getToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;