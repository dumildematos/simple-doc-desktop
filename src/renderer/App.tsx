import { useContext, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'

import './App.global.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { MainContext, MainContextProvider } from './contexts/MainContext';
import SignUp from './pages/SignUp/SignUp';

const LightTheme = {
  boxBg: '#dee3ed',
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

  mainHomeBG: '#fff'

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
  mainHomeBG: '#2a2828'
};

const themes: any = {
  light: LightTheme,
  dark: DarkTheme,
};

const GlobalStyle = createGlobalStyle`
  .ant-select-dropdown {
    background: ${(props: { theme: string | number; }) => themes[props.theme].modalBg} !important;
    .ant-select-item{
      &.ant-select-active{
        background: ${(props: { theme: string | number; }) => themes[props.theme].modalBg} !important;
      }
      color: ${(props: { theme: string | number; }) => themes[props.theme].modalInputColor};
      background: ${(props: { theme: string | number; }) => themes[props.theme].modalBg} !important;

    }
  }
  ul.ant-dropdown-menu.ant-dropdown-menu-root.ant-dropdown-menu-vertical.ant-dropdown-menu-light {
    background: ${(props: { theme: string | number; }) => themes[props.theme].modalBg} !important;
    li{
      &.ant-select-active{
        background: ${(props: { theme: string | number; }) => themes[props.theme].modalBg} !important;
      }
      color: ${(props: { theme: string | number; }) => themes[props.theme].modalInputColor};
      background: ${(props: { theme: string | number; }) => themes[props.theme].modalBg} !important;
    }
  }
`;

export default function App() {

  const [Apptheme, setTheme] = useState('light');
  const { theme  } = useContext(MainContext);
  const [goToLogin, setGoToLogin] = useState();
  const accessToken = localStorage.getItem('access_token');
  const queryClient = new QueryClient();

  console.log(themes[Apptheme]);
  console.log(Apptheme);

  return (
    <QueryClientProvider client={queryClient}>
      <MainContextProvider>
        <GlobalStyle theme={Apptheme} />
        <ThemeProvider theme={themes[Apptheme]}>
          <Router>
            <Switch>
              <Route exact path={['/', '/index.html', '/login', "", `${location.pathname}`]}>
                { !accessToken ? (
                  <Login setGoToLogin={setGoToLogin} />
                ) : (<Redirect to="/home" />) }
              </Route>
              <Route exact path={['/signup', `${location.pathname}`]}>
                  <SignUp />
              </Route>
              <Route exact path={['/home', '/index.html', `${location.pathname}`]}>
                <Home theme={theme} setTheme={setTheme} />
              </Route>

            </Switch>
          </Router>
        </ThemeProvider>
      </MainContextProvider>
    </QueryClientProvider>
  );
}

