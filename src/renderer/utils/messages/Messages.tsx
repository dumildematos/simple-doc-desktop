import { message } from 'antd';

const isLoading = (text: string) => {
  const hide = message.loading(text, 0);
  setTimeout(hide, 2500);
};

export const messageIsloading = (text: string) => {
  isLoading(text);
};
