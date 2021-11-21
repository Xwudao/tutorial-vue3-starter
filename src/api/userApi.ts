import useHttp from '@/api/useHttp';
import { BasicResp } from '@/api/types';

export interface RegParams {
  username: string;
  password: string;
  email: string;
}
export const reqUserRegister = (params: RegParams) => {
  //axios http
  return useHttp<BasicResp<null>>({
    url: `/v1/user`,
    method: 'post',
  });
};

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginData {
  info: UserInfo;
  token: string;
}

export interface UserInfo {
  id: number;
  create_time: string;
  update_time: string;
  username: string;
  email: string;
  role: string;
}
export const reqUserLogin = (params: LoginParams) => {
  //axios http
  return useHttp<BasicResp<LoginData>>({
    url: `/v1/user/login`,
    method: 'post',
    data: { ...params },
  });
};

export interface UserListData {
  list: UserInfo[];
  total: number;
}

export const reqUserList = (page: number, size: number) => {
  return useHttp<BasicResp<UserListData>>({
    url: `/admin/v1/user`,
    method: 'get',
    params: { page, size },
  });
};
//axios 封装完毕

//register 界面 x

//login 界面
