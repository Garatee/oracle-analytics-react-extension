/*global chrome*/

import React from 'react';
import styled from 'styled-components'
import { OracleForm } from './components/Form'
import { OracleDropdown } from './OracleDropdown'


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
    // chrome.storage.sync.set({status: STATUS.LOGGED_IN});
  }

  onClickLogout = () => {
    this.setState({ status: STATUS.LOGGED_OUT })
    // chrome.storage.sync.set({status: STATUS.LOGGED_OUT});
  }

  render() {
    return (
      this.state.status == STATUS.LOGGED_IN ? (
        <OracleDropdown onClickLogout={this.onClickLogout} />
      ) : (
        <Wrapper>
          <Logo src="logo/oracle-logo-bar.png" alt="oracle logo"/>
          <OracleForm onClickSubmitForm={this.onClickSubmitForm} />
        </Wrapper>
      )
    )
  }

}

const Wrapper = styled.div`
  width: 600px;
  height: 478px;
  background-color: #f7f7f7;
  box-shadow: 0 -1px 0 rgb(0 0 0 / 15%);
  transition: bottom 0.4s ease 0s;

`

const Logo = styled.img`
  width: 70%;
  margin-left: 15%;
  margin-right: 15%;
`


export default App;
