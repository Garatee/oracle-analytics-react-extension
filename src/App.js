/*global chrome*/

import React from 'react';
import { OracleDropdown } from './OracleDropdown'
import { OracleLogin } from './OracleLogin'


const STATUS = {
  LOGGED_OUT: "LOGGED_OUT",
  LOGGED_IN: "LOGGED_IN"
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: props.status,
      allTableId: [],
      isInitialized: false
    }
  }

  componentDidMount() {
    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      (tabs) => {
        const { id: tabId } = tabs[0].url;
        const code = `
          var tables = [...document.querySelectorAll("table")];
          tables.forEach((table, index) => {
            if(!table.id || table.id.length == 0) {
              table.id = "unamed_table" + index
            }
          })
          tables.map(element => element.id)
        `;
        chrome.tabs.executeScript(tabId, { code }, (result) => {
          this.setState({ isInitialized: true, allTableId: result[0] })
        });
      }
    );
  }

  onTargetTable = (tableId, shouldTarget) => {
    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      (tabs) => {
        const { id: tabId } = tabs[0].url;
        const color = shouldTarget ? "yellow" : "white";
        const opacity = shouldTarget ? 0.8 : 1;
        const code = `
          var table = document.getElementById("${tableId}");
          table.style.backgroundColor = "${color}";
          table.style.opacity = ${opacity};
        `;
        chrome.tabs.executeScript(tabId, { code });
      }
    );
  }

  onDownloadTable = (tableId) => {
    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      (tabs) => {
        const { id: tabId } = tabs[0].url;
        chrome.tabs.executeScript(tabId, {code: `tableIdToDownload = "${tableId}";`}, () => { 
          chrome.tabs.executeScript(tabId, {file: "downloadcsv.js"});
        });
      }
    );
  }

  onClickSubmitForm = () => {
    this.setState({ status: STATUS.LOGGED_IN });
    if(this.props.isRunningOnChromeExtension)
      chrome.storage.sync.set({status: STATUS.LOGGED_IN});
  }

  onClickLogout = () => {
    this.setState({ status: STATUS.LOGGED_OUT })
    if(this.props.isRunningOnChromeExtension)
      chrome.storage.sync.set({status: STATUS.LOGGED_OUT});
  }

  render() {
    return (
      this.state.status == STATUS.LOGGED_IN ? (
        <OracleDropdown 
          onClickLogout={this.onClickLogout} 
          onTargetTable={this.onTargetTable}
          onDownloadTable={this.onDownloadTable}
          allTableId={this.state.allTableId} 
          isInitialized={this.state.isInitialized}
        />
      ) : (
        <OracleLogin onClickSubmitForm={this.onClickSubmitForm} />
      )
    )
  }

}

export default App;
