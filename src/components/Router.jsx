import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import MainRouter from './MainRouter';
import { Provider } from 'react-redux';
import store from './../store';
import { isLoggedIn } from './../redux/actions/auth';
import { ToastProvider } from 'react-toast-notifications';

const Router = () => {
  useEffect(() => {
    store.dispatch(isLoggedIn());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <MainRouter />
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
