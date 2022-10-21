import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

const UserBar = () => {
  return (
    <Wrapper>
        <View>
            <TextWelcome>Prieks tevi redzēt,</TextWelcome>
            <TextUser>ansisarthurdev</TextUser>
        </View>

        <UserAvatar
        className='user-image'
        source={{uri: 'https://lh3.googleusercontent.com/a/ALm5wu2I4LRRStJa7Q-Walr64YnnzPdsJOHzbQLG4B2uZQ=s83-c-mo'}}
        />
    </Wrapper>
  )
}

const TextUser = styled.Text`
color: #24282C;
font-size: 22px;
font-weight: bold;
`

const TextWelcome = styled.Text`
color: #6A6A6A;
font-size: 16px;
`

const UserAvatar = styled.Image`
width: 50px;
height: 50px;
object-fit: contain;
border-radius: 180px;
`

const Wrapper = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
gap: 20px;
padding: 0 5%;
margin-bottom: 40px;
`

export default UserBar