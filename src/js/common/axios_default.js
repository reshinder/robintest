import domain from './domain';
import axios from '../lib/axios.min'

let axiosInstance = axios.create({
    baseURL:domain.testDomain,
    responseType: 'json',
    headers: {'Content-Type': 'application/json;charset=UTF-8;'}
});

export default axiosInstance;