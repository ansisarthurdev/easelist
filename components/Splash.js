import React from 'react'
import styled from 'styled-components'

//icons
import { FontAwesome5 } from '@expo/vector-icons';

const Splash = () => {
  return (
    <Wrapper>
        <FontAwesome5 name="warehouse" size={24} color='#24282C' />
        <Text>easelist</Text>
    </Wrapper>
  )
}

const Text = styled.Text`
font-size: 18px;
font-weight: bold;
margin-top: 5px;
`

const Wrapper = styled.View`
flex: 1;
justify-content: center;
align-items: center;
background-color: #F7F6F0;
`

export default Splash