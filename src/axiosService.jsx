import axios from "axios";
import { Cookies } from 'react-cookie';
export const axiosService = axios.create(
    {
        baseURL: 'http://18.216.171.133:8000/api',
        headers: {
            'Content-Type': 'application/json',
        }
    }
)
axiosService.interceptors.request.use(
    (config) => {
        const cookies = new Cookies();
        config.headers.Authorization = "Bearer " + cookies.get('token');
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);
