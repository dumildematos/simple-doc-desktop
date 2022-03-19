import { BellOutlined } from '@ant-design/icons';
import { Dropdown, Badge, Button, Menu, Avatar, List } from 'antd';
import styled from 'styled-components';

const Navigation = styled.div`
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
      </Navigation>
    </>
  );
}
