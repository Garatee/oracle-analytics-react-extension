/*global chrome*/

import React from 'react';
import styled from 'styled-components'
import { OracleForm } from './components/Form'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props
    }
  }

  onClickSubmitForm() {
    // chrome.storage.sync.set({status: "LOGGED_IN"}, function() {
    // });
  }

  render() {
    return (
      this.state.status == "LOGGED_IN" ? (
        <div>
          logged in 
        </div>
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
