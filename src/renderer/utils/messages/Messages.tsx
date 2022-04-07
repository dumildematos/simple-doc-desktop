import { LoadingOutlined } from '@ant-design/icons';
import { message, Modal, Spin } from 'antd';

const key = '';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const mensagem = (type: string, text: string) => {
  message.destroy();
  const hide = message[type](text, 0);
  setTimeout(() => {
    message.destroy();
  }, 2500);
  // if (type === 'loading') {
  //   setTimeout(hide, 2500);
  // }
  // message.loading({ content: 'Loading...', key });
  // setTimeout(() => {
  //   message.success({ content: 'Loaded!', key, duration: 2 });
  // }, 1000);
  // info();
};

// eslint-disable-next-line import/prefer-default-export
export const MessageShow = (type: string, text: string) => {
  mensagem(type, text);
};

const info = (type: string) => {
  Modal.info({
    content: (
      <div>
        <Spin indicator={antIcon} />
      </div>
    ),
  });
};
