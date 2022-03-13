import React, { useState, createContext, ReactNode, useEffect } from 'react';

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
  accessToken: string;
  refreshToken: string;
  defineRoutedState: (state: boolean) => void;
  definePageInfo: (data: any) => void;
  definedEditorIsOpened: (state: boolean) => void;
  defineDocSideBar: (state: boolean) => void;
  defineCurrentPath: (path: string) => void;
  defineTheme: (name: string) => void;
  defineAcesstoken: (token: string) => void;
  defineRefreshtoken: (token: string) => void;
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
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    console.log({ editorOpened, isRouted });
  }, [editorOpened, isRouted, theme]);

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

  const defineAcesstoken = (token: string) => {
    setAccessToken(token);
  };

  const defineRefreshtoken = (token: string) => {
    setRefreshToken(token);
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
        defineAcesstoken,
        defineRefreshtoken,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
