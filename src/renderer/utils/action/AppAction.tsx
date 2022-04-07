import { useContext } from 'react';
import { MainContext } from 'renderer/contexts/MainContext';

// eslint-disable-next-line import/prefer-default-export
export const AppLogout = () => {
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
  } = useContext(MainContext);

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
    history.push(`${location.pathname}`);
    window.location.href = window.location.origin;
    // document.location.reload();
  }, 2000);
  // history.push(`${location.pathname}`);
  // document.location.reload();
  // document.location.replace(document.location.origin);
  // setTimeout(() => history.push('/'), 10);
};
