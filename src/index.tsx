import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import startApp from './App';

startApp({ dealers: ['id1', 'id2'] });

ReactDOM.render(
    <>
    <div id="app-root"></div>
    <div id="root"></div></>,
    document.getElementById('root')
);
