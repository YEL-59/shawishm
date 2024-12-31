import axios from 'axios';
import { toast } from 'react-hot-toast';
import {clearToken, getTokenFromCookie} from "../../utils/cookieHelper.js";

const axiosInstance = axios.create({
    baseURL: 'https://prideridgehc.softvencefsd.xyz/api',
});

axiosInstance.interceptors.request.use(
    (config) => {
        let token = getTokenFromCookie();

        if (!token) {
            token = localStorage.getItem('token');
        }
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            clearToken();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
