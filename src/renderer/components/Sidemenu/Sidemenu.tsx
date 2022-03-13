import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Divider, Dropdown, Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  DownOutlined,
  MailOutlined,
  PieChartOutlined,
  SettingFilled,
} from '@ant-design/icons';
import styled from 'styled-components';
import ModalSettings from './ModalSettings';
import { MainContext } from 'renderer/contexts/MainContext';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Sidemenu({ collapse, t, setTheme, theme }) {
  const {
    user,
    defineRoutedState,
    definePageInfo,
    definedEditorIsOpened,
    defineDocSideBar,
    defineCurrentPath,
    defineUser,
    defineAcesstoken,
    defineRefreshtoken
  } = useContext(MainContext);
  const [settingModal, setSettingModal] = useState({
    loading: false,
    visible: false,
  });

  const history = useHistory();

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
      setTimeout(() => history.push('/'), 10);
    }
  };

  const MenuDropDown = (
    <Menu onClick={userMenu}>
      <Menu.Item key="1">{t('home.user_dropdown_menu.profile')}</Menu.Item>
      <Menu.Item key="2" icon={<DownOutlined />} disabled>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      </Menu.Item>
      <Menu.Item key="3" disabled>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      </Menu.Item>
      <Menu.Item key="settings">{t('home.settings.setting')}</Menu.Item>
      <Menu.Item key="logout">{t('home.user_dropdown_menu.logout')}</Menu.Item>
    </Menu>
  );

  return (
    // eslint-disable-next-line react/destructuring-assignment
    <>
      <Sider trigger={null} collapsible collapsed={collapse.collapsed}>
        <div className="logo" style={{ marginTop: '1.9em' }}>
          {/* <Avatar src="https://avatars.githubusercontent.com/u/10828841?s=400&u=56ba8276db1da2bc8dfee5532e0a677d40916b9e&v=4" /> */}
          <Avatar
            style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
            size={32}
            gap={4}
          >
            D M
          </Avatar>
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
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Option 3
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title="Navigation Two"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
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
