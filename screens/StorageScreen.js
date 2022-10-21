import React from 'react'
import styled from 'styled-components/native'

//components
import UserBar from '../components/UserBar'
import Storages from '../components/Storages'

const StorageScreen = () => {
return (
    <Wrapper>
      <UserBar />
      <Storages />
    </Wrapper>
  )
}

const Wrapper = styled.View`
background-color: #D9D9D9;
display: flex;
height: 100%;
padding-top: 40px;
`

export default StorageScreen