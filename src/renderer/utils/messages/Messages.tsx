import { LoadingOutlined } from '@ant-design/icons';
import { message, Modal, Spin } from 'antd';

const key = '';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const mensagem = (type: string, text: string) => {
  message.destroy();
  message[type](text, 0);
  setTimeout(() => {
    message.destroy();
  }, 2500);
};

// eslint-disable-next-line import/prefer-default-export
export const MessageShow = (type: string, text: string) => {
  mensagem(type, text);
};

export function RequestAlert(title: string, description: string) {
  Modal.warning({
    title,
    content: (
      <div>
        <p>{description}</p>
      </div>
    ),
    onOk() {
      localStorage.clear();
      window.location.href = '/';
    },
  });
}
const info = (type: string) => {
  Modal.info({
    content: (
      <div>
        <Spin indicator={antIcon} />
      </div>
    ),
  });
};
