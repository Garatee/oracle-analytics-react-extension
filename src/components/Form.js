import React from 'react';
import styled from 'styled-components'
import './Form.css'

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { FaUserAlt, FaLock, FaLink } from 'react-icons/fa'


export const OracleForm = (props) => {
  return (
    <Form>
      <MyInputGroup className="col-sm-8">
        <InputGroup.Prepend>
          <MyLabel variant="outline-secondary" disabled> <FaUserAlt /> </MyLabel>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Oracle Analytics username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </MyInputGroup>

      <MyInputGroup className="col-sm-8">
        <InputGroup.Prepend>
          <MyLabel variant="outline-secondary" disabled> <FaLock /> </MyLabel>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Oracle Analytics password"
          aria-label="Password"
          type="password" 
          aria-describedby="basic-addonw"
        />
      </MyInputGroup>

      <MyTextAreaInputGroup className="col-sm-8">
        <InputGroup.Prepend>
          <MyLabel variant="outline-secondary" disabled> <FaLink /> </MyLabel>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Oracle Analytics homepage url"
          aria-label="oracle analytics url"
          as="textarea" 
        />
      </MyTextAreaInputGroup>
      <MySubmitButton variant="primary" onClick={() => props.onClickSubmitForm()} > Submit </MySubmitButton>
    </Form>
  )

}


const MyInputGroup = styled(InputGroup)`
  margin: auto;
  margin-top: 20px;
`

const MyTextAreaInputGroup = styled(MyInputGroup)`
  height: 100px;
`

const MySubmitButton = styled(Button)`
  width: 60%;
  margin-top: 30px;
  margin-left: 20%;
`

const MyLabel = styled(Button)`
  opacity: 1 !important;
`