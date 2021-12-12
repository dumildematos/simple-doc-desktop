import React, { Suspense } from 'react';
import { render } from 'react-dom';
import App from './App';
import './locales/i18n';

render(
  <Suspense fallback="...is loading">
    <App />
  </Suspense>,
  document.getElementById('root')
);
