import { useState, createContext, ReactNode, useEffect } from 'react';
import { LoginResponse } from 'renderer/models/UserModels';

type GroupPage = {
  id: number;
  title: string;
};

type Page = {
  isRouted: boolean;
  groupPage: any;
  editorOpened: boolean;
  visibleDocSidebar: boolean;
  currentPath: string;
  theme: string;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: LoginResponse | undefined;
  defineRoutedState: (state: boolean) => void;
  definePageInfo: (data: any) => void;
  definedEditorIsOpened: (state: boolean) => void;
  defineDocSideBar: (state: boolean) => void;
  defineCurrentPath: (path: string) => void;
  defineTheme: (name: string) => void;
  defineAcesstoken: (token: string) => void;
  defineRefreshtoken: (token: string) => void;
  defineUser: (user: LoginResponse) => void;
};

type Node = {
  children: ReactNode;
};

export const MainContext = createContext({} as Page);

export function MainContextProvider({ children }: Node) {
  const [isRouted, setRouted] = useState(false);
  const [groupPage, setGroupPage] = useState({});
  const [editorOpened, setOpenedEditor] = useState(false);
  const [visibleDocSidebar, setVisibleDocSidebar] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [theme, setTheme] = useState('light');
  const [accessToken, setAccessToken] = useState(undefined);
  const [refreshToken, setRefreshToken] = useState(undefined);
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log({ editorOpened, isRouted });
  }, [editorOpened, isRouted, theme, accessToken]);

  const defineRoutedState = (state: boolean) => {
    setRouted(state);
  };

  const definePageInfo = (data: any) => {
    setGroupPage(data);
  };

  const definedEditorIsOpened = (state: boolean) => {
    setOpenedEditor(state);
  };

  const defineDocSideBar = (state: boolean) => {
    setVisibleDocSidebar(state);
  };

  const defineCurrentPath = (path: string) => {
    setCurrentPath(path);
  };

  const defineTheme = (name: string) => {
    setTheme(name);
  };

  const defineAcesstoken = (token: string | undefined) => {
    setAccessToken(token);
  };

  const defineRefreshtoken = (token: string | undefined) => {
    setRefreshToken(token);
  };

  const defineUser = (user: LoginResponse | {}) => {
    setUser(user);
  };

  return (
    <MainContext.Provider
      value={{
        isRouted,
        defineRoutedState,
        groupPage,
        definePageInfo,
        editorOpened,
        definedEditorIsOpened,
        visibleDocSidebar,
        defineDocSideBar,
        currentPath,
        defineCurrentPath,
        theme,
        defineTheme,
        accessToken,
        refreshToken,
        defineUser,
        defineAcesstoken,
        defineRefreshtoken,
        user,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
