import dayjs from 'dayjs';

const add = (n: number) => {
  return n + 1;
};

const formDate = (d: string) => {
  return dayjs(d).format('YYYY-MM-DD HH:mm:ss');
};

export { add, formDate };
