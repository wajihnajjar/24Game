import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider template={AlertTemplate} >
    <App />
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
