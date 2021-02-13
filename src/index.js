/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


const isRunningOnChromeExtension = process.env.NODE_ENV !== 'development';

if(isRunningOnChromeExtension) {
  chrome.storage.sync.get(['status'], (result) => {
    ReactDOM.render(
      <React.StrictMode>
        <App {...result} isRunningOnChromeExtension={isRunningOnChromeExtension} /> 
      </React.StrictMode>,
      document.getElementById('root')
    )
  });
}
else {
  ReactDOM.render(
    <React.StrictMode>
      <App isRunningOnChromeExtension={isRunningOnChromeExtension} /> 
    </React.StrictMode>,
    document.getElementById('root')
  )
}



