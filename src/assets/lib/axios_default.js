import domain from '../config/domain.js';
import axios from 'axios'

let axiosInstance = axios.create({
    baseURL:domain.testDomain,
    responseType: 'json',
    headers: {'Content-Type': 'application/json;charset=UTF-8;'}
});

export default axiosInstance;
