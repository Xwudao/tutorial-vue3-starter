export interface BasicResp<T> {
  code: number;
  data: T;
  msg: string;
}
