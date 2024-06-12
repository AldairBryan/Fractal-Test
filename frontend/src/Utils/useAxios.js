import axios from 'axios';
import { API_BASE_URL } from './constants';

const useAxios = (route = '') => {

    const axiosInstance = axios.create({
        baseURL: `${API_BASE_URL}${route}`
    });

    return axiosInstance;
};

export default useAxios;