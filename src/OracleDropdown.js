import React, { useState } from 'react';
import styled from 'styled-components'
import { FaCaretDown, FaSearch, FaPowerOff } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiPencilFill } from 'react-icons/ri';

const iconStyle = {
  marginRight: "5px", 
}

export function OracleDropdown(props){

  const [shouldShow1, setShouldShow1] = useState(true);
  const [shouldShow2, setShouldShow2] = useState(true);
  const isZillow = props.url.startsWith("https://www.zillow.com/")

  return (
    <Wrapper>
      <MajorOption onClick={() => setShouldShow1(!shouldShow1)}> <FaCaretDown size={17} style={iconStyle} /> Explore table in Oracle Analytics </MajorOption>
      { isZillow && <MinorOption shouldShow={shouldShow1} onClick={() => props.onDownloadCurrentZillowData()}> zillow housing data </MinorOption> }
      {!props.isInitialized ? <div />
        : props.allTableId.length === 0 && !isZillow ?
          <NoTable> no tables on this page </NoTable>
          : props.allTableId.map((tableId, index) => (
            <MinorOption 
              shouldShow={shouldShow1}
              key={index}
              onMouseEnter={() => props.onTargetTable(tableId, true)}
              onMouseLeave={() => props.onTargetTable(tableId, false)}
              onClick={() => props.onDownloadTable(tableId)}
            > 
              {tableId && tableId.length > 0 ? tableId : "unamed table"} 
            </MinorOption>
          ))
      }
      
      <MajorOption onClick={() => setShouldShow2(!shouldShow2)}> <FaSearch size={17} style={iconStyle} /> Explore popular downloads </MajorOption>
        <MinorOption shouldShow={shouldShow2}> NY Times Covid data </MinorOption>
        <MinorOption shouldShow={shouldShow2}> Weather data </MinorOption>
        <MinorOption shouldShow={shouldShow2}> NY Times Stock data </MinorOption>
        <MinorOption shouldShow={shouldShow2} onClick={props.onDownloadZillowData} > Zillow housing prices </MinorOption>

      <MajorOption> <RiPencilFill size={17} style={iconStyle} /> (Advanced) Create your Own Script </MajorOption>
      <MajorOption> <IoSettingsSharp size={17} style={iconStyle} /> Settings </MajorOption>
      <MajorOption onClick={props.onClickLogout} > <FaPowerOff size={17} style={iconStyle} /> Log out </MajorOption>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: white;
  box-shadow: 0 4px 10px 4px rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  font-size: 13px;
  width: 280px;
`

const MajorOption = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 7px;
  text-align: left;
  color: black;
  &:hover {
    background: #f2f2f2;
    text-decoration: none;
    cursor: pointer;
  } 
`;

const MinorOption = styled(MajorOption)`
  padding-left: 30px;
  color: grey;
  display: ${props => props.shouldShow ? "block" : "none"};
`

const NoTable = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 7px;
  text-align: left;
  padding-left: 30px;
  color: grey;
  cursor: text;
`
