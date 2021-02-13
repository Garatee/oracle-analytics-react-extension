/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// chrome.storage.sync.get(['status'], function (result) {
  ReactDOM.render(
    <React.StrictMode>
      <App  />  {/** {...result} */}
    </React.StrictMode>,
    document.getElementById('root')
  )
// });
