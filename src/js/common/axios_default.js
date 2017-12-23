import domain from './domain';
import Axios from '../lib/axios.min'

Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8;';
Axios.defaults.baseURL = domain.testDomain;

export default Axios;