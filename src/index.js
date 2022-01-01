import React from 'react';
import ReactDOM from 'react-dom';

import './assets/styles/style.scss';
import Router from './components/Router';
localStorage.removeItem('myprofileSelect');
localStorage.setItem('myprofileSelect', 1);
ReactDOM.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
    document.getElementById('app')
);

