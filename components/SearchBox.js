import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'

//icons
import { FontAwesome } from '@expo/vector-icons';

const SearchBox = () => {
  return (
    <Wrapper>
      <FontAwesome name="search" size={24} color="black" 
        style={{marginRight: 10}}
      />
      <TextInput 
        style={{width: '90%'}}
        placeholder='Meklēt...'
        cursorColor='#24282C'
      />
    </Wrapper>
  )
}

const Wrapper = styled.View`
background-color: white;
padding: 10px 20px;
border-radius: 10px;
margin-bottom: 10px;
flex-direction: row;
`

export default SearchBox