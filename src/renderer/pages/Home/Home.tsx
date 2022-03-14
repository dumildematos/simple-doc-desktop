import React, { useContext, useEffect, useState } from 'react';
import { Layout, PageHeader } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory,
  Redirect, 
} from "react-router-dom";
import Sidemenu from 'renderer/components/Sidemenu/Sidemenu';
import { MainContext } from 'renderer/contexts/MainContext';
import { useTranslation } from 'react-i18next';
import Groups from '../Groups/Groups';
import Group from '../Group/Group';
import MainLayout from '../../components/MainLayout/MainLayout';
import { getUserData } from 'renderer/services/UserService';
import { LoginForm } from 'renderer/models/UserModels';
import { Explorer } from '../Explorer/Explorer';
import { InvitedGroups } from '../InvitedGroups/InvitedGroups';
import { Marketplace } from '../Marketplace/Marketplace';
import { TemplateBuilder } from '../TemplateBuilder/TemplateBuilder';

const { Header, Content } = Layout;
let inPage = false;

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const localtoken = localStorage.getItem('access_token');

export default function Home({ theme, setTheme }) {
  console.log(localtoken);
  if(!localtoken){
    console.log('No access')
    document.location.replace(document.location.origin);
    // history.push('/')
  }
  const history = useHistory();

  const { path, url } = useRouteMatch();
  const {
    isRouted,
    defineRoutedState,
    groupPage,
    editorOpened,
    defineDocSideBar,
    definedEditorIsOpened,
    defineUser,
    accessToken
  } = useContext(MainContext);

  console.log(accessToken)

  const onSuccess = () => {
    console.log(data?.data)
    localStorage.setItem('user', JSON.stringify(data?.data));
    const user: LoginForm = data?.data;
    defineUser(user);
  };

  const onError = () => {

  };

  const { isLoading , data, isError , error } = getUserData(onSuccess , onError , localtoken);

  const { t, i18n } = useTranslation();

  // useEffect(() => {
  //   inPage = isRouted;
  // }, [inPage, isRouted, MainLayout]);

 

  const [collapse, setCollapse] = useState({
    collapsed: false,
  });

  const [hashes, setHash] = useState({
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    inputVisible: false,
    inputValue: '',
  });

  const toggle = () => {
    setCollapse({
      collapsed: !collapse.collapsed,
    });
  };

  const handleInputConfirm = () => {
    const { inputValue } = hashes;
    let { tags } = hashes;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    setHash({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  const openGroup = (group: any) => {
    console.log(group);
  };

  const showDrawer = () => {
    defineDocSideBar(true);
  };
  const onCloseDrawer = () => {
    defineDocSideBar(false);
  };

  return (
    <>
    <MainLayout theme={theme} isRouted={isRouted}>
    <Router>

    <Layout className="main-layout">
      <Sidemenu
            t={t}
            theme={theme}
            setTheme={setTheme}
            collapse={collapse}
            navURL={url}

        />
        <Layout
            className="site-layout"
            style={{ padding: 0, background: 'cyan'}}
          >
           <Header
              className="site-layout-background nav"
              style={{
                position: 'fixed',
                zIndex: 1,
                width: '100%',
                padding: 0,
              }}
            >
              {React.createElement(
                collapse.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: toggle,
                }
              )}
              {isRouted && (
                <PageHeader
                  className="site-page-header"
                  onBack={() => {
                    // window.history.back();
                    defineRoutedState(false);
                    definedEditorIsOpened(false);
                    history.push('/home');
                  }}
                  title={groupPage.title}
                  // subTitle="This is a subtitle"
                />
              )}
              {/* <div>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => {
              i18n.changeLanguage(lng);
              setCounter(count + 1);
            }}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        <p>
          <i>{t('counter', { count })}</i>
        </p> */}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '60px 16px 15px 16px',
                padding: !isRouted ? 24 : 0,
                minHeight: 280,
                // background: !isRouted ? 'theme.boxBg' : 'transparent',
              }}
            >
        <div>

          <Switch>
              {/* { localtoken &&  (<Redirect to='/'/> ) } */}
            {/* <Route>
            </Route> */}
            <Route exact path="/">
              {!isRouted && <Groups t={t} theme={theme} />}
            </Route>
            <Route path={`/group/:id`}>
              {isRouted && !editorOpened && <Group />}
            </Route>
            <Route exact path="/explorer">
              <Explorer />
            </Route>
            <Route exact path="/invited-teams">
              <InvitedGroups />
            </Route>
            <Route exact path={`/marketplace`}>
              <Marketplace />
            </Route>
            <Route exact path="/template-builder">
              <TemplateBuilder />
            </Route>
          </Switch>
        </div>
            </Content>
        </Layout>
    </Layout>
      </Router>
    </MainLayout>

    </>
  );
}