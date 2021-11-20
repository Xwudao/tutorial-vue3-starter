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
//axios 封装完毕

//register 界面 x

//login 界面
