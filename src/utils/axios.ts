import axios from 'axios';
import { useUserStore } from '@/store/user'

const service = axios.create({
  baseURL: import.meta.env.VITE_PROXY,
  timeout: 120000 // request timeout
});
const userStore = useUserStore()
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = userStore.getToken()
    config.headers['X-Access-Token'] = token;
    // do something
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  async (response) => {
      // do something
     // debugger
      return response.data
    },
    (error) => {
      // do something
      if(error.response.status==401){
        return error.response
      }
      return Promise.reject(error);
    }
);

export default service;