import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Badge, Divider, Dropdown, Layout, Menu } from 'antd';
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  DownOutlined,
  MailOutlined,
  PieChartOutlined,
  SearchOutlined,
  SettingFilled,
  ShopOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { MainContext } from 'renderer/contexts/MainContext';
import ModalSettings from './ModalSettings';

const { Sider } = Layout;
const { SubMenu } = Menu;
const hasLogin = localStorage.getItem('hasLogin');

// window.addEventListener('online', updateOnlineStatus);
// window.addEventListener('offline', updateOnlineStatus);

// const updateOnlineStatus = () => {
//   return navigator.onLine ? 'success' : 'error';
// };
export default function Sidemenu({ collapse, t, setTheme, theme, navURL }) {
  const history = useHistory();

  if (hasLogin === 'true') {
    console.log('show my teams');
    history.push('/');
  }

  const {
    defineRoutedState,
    definePageInfo,
    definedEditorIsOpened,
    defineDocSideBar,
    defineCurrentPath,
    defineUser,
    defineAcesstoken,
    defineRefreshtoken,
    defineBackButton,
    logout
  } = useContext(MainContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const [settingModal, setSettingModal] = useState({
    loading: false,
    visible: false,
  });

  // history.push('/');

  const userMenu = (e: any) => {
    console.log(e);

    if (e.key === 'settings') {
      setSettingModal({ visible: true });
    }

    if (e.key === 'logout') {
      localStorage.clear();
      defineRoutedState(false);
      definePageInfo({});
      definedEditorIsOpened(false);
      defineDocSideBar(false);
      defineCurrentPath('');
      defineUser({});
      defineAcesstoken(undefined);
      defineRefreshtoken(undefined);
      // window.location.href = '/';
      setTimeout(() => {
        // history.push('/home');
        history.push(`${location.pathname}`)
        window.location.href = window.location.origin;
        // document.location.reload();
      }, 2000)
      // history.push(`${location.pathname}`);
      // document.location.reload();
      // document.location.replace(document.location.origin);
      //setTimeout(() => history.push('/'), 10);
    }
  };

  const MenuDropDown = (
    <Menu onClick={userMenu}>
      <Menu.Item key="1">{t('home.user_dropdown_menu.profile')}</Menu.Item>
      <Menu.Item key="2">Notificações</Menu.Item>
      {/* <Menu.Item key="2" icon={<DownOutlined />} disabled>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      </Menu.Item> */}
      {/* <Menu.Item key="3" disabled>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      </Menu.Item> */}
      <Menu.Item key="settings">{t('home.settings.setting')}</Menu.Item>
      <Menu.Item key="logout">{t('home.user_dropdown_menu.logout')}</Menu.Item>
    </Menu>
  );

  return (
    // eslint-disable-next-line react/destructuring-assignment
    <>
      <Sider trigger={null} collapsible collapsed={collapse.collapsed}>
        <div className="logo" style={{ marginTop: '1.9em' }}>
          <Badge status={'success'} dot="true" offset={[-6, 28]}>
            <Avatar src="https://avatars.githubusercontent.com/u/10828841?s=400&u=56ba8276db1da2bc8dfee5532e0a677d40916b9e&v=4" />
          </Badge>
          {/* <Avatar
            style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
            size={32}
            gap={4}
          >
            D M
          </Avatar> */}
          {!collapse.collapsed ? (
            <Dropdown overlay={MenuDropDown}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {`${user?.firstname} ${user?.lastname}`} <DownOutlined />
              </a>
            </Dropdown>
          ) : (
            ''
          )}
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          // onSelect={() => {
          //   defineBackButton({
          //     state: false,
          //     title: '',
          //     subtitle: '',
          //   });
          // }}
        >
          <Menu.Item key="1" icon={<TeamOutlined />}>
            <Link to="/">My Teams</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserSwitchOutlined />}>
            <Link to="/invited-teams">Invited Teams</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SearchOutlined />}>
            <Link to="/explorer">Explorer</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ShopOutlined />}>
            <Link to="/marketplace">Marketplace</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<AppstoreAddOutlined />}>
            <Link to="/template-builder">Template Builder</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <ModalSettings
        t={t}
        theme={theme}
        setTheme={setTheme}
        settingModal={settingModal}
        setSettingModal={setSettingModal}
      />
    </>
  );
}
