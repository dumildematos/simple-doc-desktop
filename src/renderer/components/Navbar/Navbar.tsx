import { BellOutlined } from '@ant-design/icons';
import { Dropdown, Badge, Button, Menu, Avatar, List } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
let stompClient = null;

const token = localStorage.getItem('access_token');
const user = JSON.parse(localStorage.getItem('user'));
const Navigation = styled.div`
  .sc-hkgtus.fsQRKm {
  }
  ul.ant-dropdown-menu.ant-dropdown-menu-root.ant-dropdown-menu-vertical.dropdown-notification-menu {
    width: 245px;
    top: -9px;
    overflow-y: scroll;
    height: 250px;
    li.ant-list-item {
      height: 104px;
    }
  }
`;

const dataNotification = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

export default function Navbar(props: any) {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState('CHATROOM');
  const [userData, setUserData] = useState({
    username: 'dumilde.matos@mailinator.com',
    receivername: '',
    connected: true,
    message: '',
  });
  useEffect(() => {
    console.log(userData);
    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect(
      {},
      () => {
        stompClient.subscribe('/chatroom/public', () => {
          alert('new Message public');
        });
        stompClient.subscribe(`/user/${user.username}/private`, () => {
          alert('new Message private');
        });
      },
      onError
    );
  }, []);

  const connect = () => {};

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe('/chatroom/public', onMessageReceived);
    stompClient.subscribe(
      `/user/${userData.username}/private`,
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    let chatMessage = {
      senderName: userData.username,
      status: 'JOIN',
    };
    stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case 'JOIN':
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case 'MESSAGE':
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    let payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE',
      };
      console.log(chatMessage);
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: 'MESSAGE',
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  const notificationMenu = (
    <Menu className="dropdown-notification-menu">
      <Menu.Item key="0">
        <List
          itemLayout="horizontal"
          dataSource={dataNotification}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for..."
              />
            </List.Item>
          )}
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Navigation collapse={props.collapse}>
        <div className="notificationDropdown">
          <Dropdown
            overlay={notificationMenu}
            trigger={['click']}
            className="dropdown-notification"
            // style={{
            //   marginLeft: props.collapse.collapsed
            //     ? '71%!important'
            //     : '81%!important',
            // }}
          >
            {/* <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Click me <DownOutlined />
                </a> */}
            <Badge count={99} offset={[-6, 10]}>
              <Button type="link" block>
                <BellOutlined />
              </Button>
            </Badge>
          </Dropdown>
        </div>
      </Navigation>
    </>
  );
}
