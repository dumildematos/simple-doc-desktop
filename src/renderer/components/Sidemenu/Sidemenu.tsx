import {
  AppstoreAddOutlined,
  DownOutlined,
  SearchOutlined,
  ShopOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Layout, Menu } from 'antd';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MainContext } from 'renderer/contexts/MainContext';
import { ThemeContext } from 'styled-components';
import AvatarIMG from './user-avatar.png';
import ModalSettings from './ModalSettings';

const { Sider } = Layout;
const hasLogin = localStorage.getItem('hasLogin');

export default function Sidemenu({ collapse , t, setTheme, theme }) {
  const history = useHistory();
  const themeContext = useContext(ThemeContext);
  console.log({ themeContext });

  if (hasLogin === 'true') {
    console.log('show my teams');
    history.push('/');
  }

  const user = JSON.parse(localStorage.getItem('user') || '');
  const [settingModal, setSettingModal] = useState({
    loading: false,
    visible: false,
  });

  // history.push('/');

  const userMenu = (e: any) => {
    console.log(e);

    if (e.key === 'profile') {
      history.push('/profile');
    }

    if (e.key === 'settings') {
      setSettingModal({ visible: true });
    }


    if (e.key === 'logout') {
      // defineRoutedState(false);
      // definePageInfo({});
      // definedEditorIsOpened(false);
      // defineDocSideBar(false);
      // defineCurrentPath('');
      // defineUser({});
      // defineAcesstoken(undefined);
      // defineRefreshtoken(undefined);
      // history.push('/login');
      localStorage.clear();
      document.location.reload();
      // history.push('/');
      //window.electron.ipcRenderer.reloadWindow();
      // window.location.reload();
      setTimeout(() => {
        // window.location.href = '/';
        // history.push('/');
        // history.push(`${location.pathname}`);
        // window.location.href = window.location.origin;
        // document.location.reload();
      }, 2000);
      // history.push(`${location.pathname}`);
      // document.location.reload();
      // document.location.replace(document.location.origin);
      //setTimeout(() => history.push('/'), 10);
    }
  };

  const MenuDropDown = (
    <Menu onClick={userMenu}>
      <Menu.Item key="profile">{t('home.user_dropdown_menu.profile')}</Menu.Item>
      {/* <Menu.Item key="2">Notificações</Menu.Item> */}
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
          <Badge status={'success'} dot={true} offset={[-6, 28]}>
            {/* <Avatar src="https://avatars.githubusercontent.com/u/10828841?s=400&u=56ba8276db1da2bc8dfee5532e0a677d40916b9e&v=4" /> */}
            { user?.avatar === '' && (<Avatar src={AvatarIMG} />) }
            { user?.avatar !== '' && (<Avatar src={user?.avatar} />) }
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
        >
          <Menu.Item key="1" icon={<TeamOutlined />}>
            <Link to="/"> {t('home.side_menu.my_teams')}</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserSwitchOutlined />}>
            <Link to="/invited-teams">{t('home.side_menu.inited_teams')}</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SearchOutlined />}>
            <Link to="/explorer">{t('home.side_menu.explorer')}</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ShopOutlined />}>
            <Link to="/marketplace">{t('home.side_menu.marketplace')}</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<AppstoreAddOutlined />}>
            <Link to="/template-builder">
              {t('home.side_menu.template_builder')}
            </Link>
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
