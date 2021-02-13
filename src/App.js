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
      ...props
    }
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
        <OracleDropdown onClickLogout={this.onClickLogout} />
      ) : (
        <OracleLogin onClickSubmitForm={this.onClickSubmitForm} />
      )
    )
  }

}

export default App;
