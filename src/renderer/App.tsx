import React, { useContext, useEffect, useState } from 'react';
import './App.global.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { MainContext, MainContextProvider } from './contexts/MainContext';
import EditableDocPage from './pages/EditableDocPage/EditableDocPage';

const LightTheme = {
  boxBg: '#D9E6F6',
  bgContent: 'red',
  navBg: '#fff',
  navInputColor: '#000',
  siteLayoutContainer: 'inherit',

  bgSidebar: '#f7f6f3',

  cardBg: '#fff',
  cardBorderColor: 'none',
  cardInnerBorderColor: 'none',
  cardTexColor: 'inherit',

  cardGroupBg: '#fff',

  modalBg: '#fff',
  modalInnerBorderColor: '#f0f0f0',
  modalBgInput: '#fff',
  modalInputColor: '#000',
  modalInputBorder: '1px solid #f0f0f0',

  titleColor: '#dc658b',
  tagLineColor: '#fff',
  textColor: '#000',
  boxBorder: 'none',
  secundaryColor: '#fff',
};
const DarkTheme = {
  boxBg: '#15181D',
  bgContent: '#141414',
  navBg: '#0A0A0A',
  navInputColor: '#bdbdbd',
  siteLayoutContainer: '#141414',

  bgSidebar: '#0A0A0A',

  cardBg: '#1F1F1F',
  cardBorderColor: '#232426',
  cardInnerBorderColor: '#2f3133',
  cardTexColor: '#bdbdbd',

  cardGroupBg: '#18191C',

  modalBg: '#292929',
  modalInnerBorderColor: '#292929',
  modalBgInput: '#1F1F1F',
  modalInputColor: '#bdbdbd',
  modalInputBorder: 'none',

  titleColor: 'lightpink',
  tagLineColor: 'lavender',
  boxBorder: '1px solid #D81D99',
  textColor: '#D81D99',
  secundaryColor: '#D81D99',
};

const themes: any = {
  light: LightTheme,
  dark: DarkTheme,
};

const GlobalStyle = createGlobalStyle`
  .ant-select-dropdown {
    background: ${(props) => themes[props.theme].modalBg} !important;
    .ant-select-item{
      &.ant-select-active{
        background: ${(props) => themes[props.theme].modalBg} !important;
      }
      color: ${(props) => themes[props.theme].modalInputColor};
      background: ${(props) => themes[props.theme].modalBg} !important;

    }
  }
  ul.ant-dropdown-menu.ant-dropdown-menu-root.ant-dropdown-menu-vertical.ant-dropdown-menu-light {
    background: ${(props) => themes[props.theme].modalBg} !important;
    li{
      &.ant-select-active{
        background: ${(props) => themes[props.theme].modalBg} !important;
      }
      color: ${(props) => themes[props.theme].modalInputColor};
      background: ${(props) => themes[props.theme].modalBg} !important;
    }
  }
`;

export default function App() {
  const { editorOpened, isRouted, theme } = useContext(MainContext);
  const [Apptheme, setTheme] = useState('light');
  const hasValidToken = true;

  // console.log(isRouted);
  if (!hasValidToken) {
    return <Login />;
  }
  return (
    <MainContextProvider>
      {/* <Home /> */}
      <GlobalStyle theme={Apptheme} />
      <ThemeProvider theme={themes[Apptheme]}>
        <Router>
          <Switch>
            <Route exact path={['/index.html', '/', '/group/:id']}>
              {!isRouted && !editorOpened ? (
                <Home theme={theme} setTheme={setTheme} />
              ) : (
                <Redirect to="/page-doc/:id" />
              )}
            </Route>
            {/* {editorOpened && (
            )} */}
            <Route path="/page-doc/:id">
              <EditableDocPage theme={theme} />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </MainContextProvider>
  );
}
