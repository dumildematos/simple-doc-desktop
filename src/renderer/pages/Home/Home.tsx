import React, { useContext, useEffect, useState } from 'react';
import { Badge, Button, Dropdown, Layout, Menu, PageHeader } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, BellOutlined } from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
  Redirect,
  useParams
} from "react-router-dom";
import Sidemenu from 'renderer/components/Sidemenu/Sidemenu';
import { MainContext } from 'renderer/contexts/MainContext';
import { useTranslation } from 'react-i18next';
import Groups from '../Groups/Groups';
import Group from '../Group/Group';
import MainLayout from '../../components/MainLayout/MainLayout';
import Explorer from '../Explorer/Explorer';
import Marketplace from '../Marketplace/Marketplace';
import InvitedGroups from '../InvitedGroups/InvitedGroups';
import TemplateBuilder from '../TemplateBuilder/TemplateBuilder';
import EditableDocPage from '../EditableDocPage/EditableDocPage';
import Navbar from 'renderer/components/Navbar/Navbar';
import { EditableTemplatePage } from '../EditableDocPage/EditableTemplatePage';

const { Header, Content } = Layout;
const localtoken = localStorage.getItem('access_token');





export default function Home({ theme, setTheme }) {

  const history = useHistory();

  if(!localtoken){
    console.log('No access')
    document.location.replace(document.location.origin);
    // history.push('/')
  }

  const { path, url } = useRouteMatch();
  const {
    isRouted,
    defineRoutedState,
    definedEditorIsOpened,
    backButton,
  } = useContext(MainContext);

  const [currentPath, setCurrentPath] = useState('/');

  const { t, i18n } = useTranslation();
  // console.log(i18n.format())

  const [collapse, setCollapse] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setCollapse({
      collapsed: !collapse.collapsed,
    });
  };

  return (
    <>
      <MainLayout theme={theme} isRouted={isRouted} collapse={collapse}>
        <Router>
          <Layout className="main-layout">
            <Sidemenu
                  t={t}
                  theme={theme}
                  setTheme={setTheme}
                  collapse={collapse}

              />
              <Layout
                  className="site-layout home-layout"
                  style={{ padding: 0}}
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
                    {/* <button onClick={() => {
                      Login
                    })}>Ir pra login</button> */}

                    {
                      backButton?.state && (
                        <PageHeader
                            className="site-page-header"
                            title={backButton.title}
                            subTitle={backButton.subtitle}
                            onBack={() => {
                              // window.history.back();
                              // defineBackButton({
                              //   state: false,
                              //   title: '',
                              //   subtitle: '',
                              //   prevPath: '/'
                              // });
                              defineRoutedState(false);
                              definedEditorIsOpened(false);
                              history.push(backButton.prevPath);
                            }}
                          />
                      )
                    }

                    <Navbar collapse={collapse} />
                  </Header>
                  <Content
                    className="site-layout-background"
                    style={{
                      margin: 0,
                      minHeight: 280,
                      background: !isRouted ? 'theme.boxBg' : 'transparent',
                    }}
                  >
                    <div>
                      <Switch>
                        <Route exact path={["/", "/my-teams"]}>
                          <Groups t={t} theme={theme}  />
                        </Route>
                        <Route exact path={`/group/:id`}>
                          <Group t={t} theme={theme}  />
                        </Route>
                        <Route exact path="/explorer">
                          <Explorer t={t} theme={theme} setPath={setCurrentPath}  />
                        </Route>
                        <Route exact path="/invited-teams">
                          <InvitedGroups t={t} theme={theme} setPath={setCurrentPath}  />
                        </Route>
                        <Route exact path={`/marketplace`}>
                          <Marketplace t={t} theme={theme} setPath={setCurrentPath}  />
                        </Route>
                        <Route exact path="/template-builder">
                          <TemplateBuilder setPath={setCurrentPath}  />
                        </Route>
                        <Route exact path="/page-doc/:id">
                            <EditableDocPage t={t} theme={theme} />
                        </Route>
                        <Route exact path="/page-template/:id">
                            <EditableTemplatePage theme={theme} />
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
