import axios from 'axios';
import { KEY_USER_ID, UserInfo } from '@/store/modules/useUserStore';
import { NO_PERMISSION, OK_CODE } from '@/app/keys';
import router from '@/router';

const requests = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 10000,
});

//拦截器
requests.interceptors.request.use((config) => {
  config = config || {};
  //pinia
  const user = JSON.parse(localStorage.getItem(KEY_USER_ID) || '') as UserInfo;
  if (user.token) {
    config.headers!['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});

requests.interceptors.response.use((resp) => {
  const { code, msg } = resp.data || {};
  if (code !== OK_CODE) {
    return Promise.reject(msg);
  }
  if (code === NO_PERMISSION) {
    router.push({ name: 'Login' }).then();
    return Promise.reject(msg);
  }
  return Promise.resolve(resp);
});

export default requests;
