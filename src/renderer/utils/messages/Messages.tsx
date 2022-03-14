import { message } from 'antd';

const meessage = (type: string, text: string) => {
  const hide = message[type](text, 0);
  if (type === 'loading') {
    setTimeout(hide, 2500);
  }
};

// eslint-disable-next-line import/prefer-default-export
export const MessageShow = (type: string, text: string) => {
  meessage(type, text);
};
