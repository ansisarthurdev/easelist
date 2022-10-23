import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

//icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

//components
import Modal from "react-native-modal";

const UserBar = () => {

  const [userModal, setUserModal] = useState(false);

  const logOut = () => {
    //..

    setUserModal(false);
  }

  return (
    <Wrapper>
        <View>
            <TextWelcome>Prieks tevi redzēt,</TextWelcome>
            <TextUser>ansisarthurdev</TextUser>
        </View>

        <TouchableOpacity onPress={() => setUserModal(true)}>
          <UserAvatar
          source={{uri: 'https://lh3.googleusercontent.com/a/ALm5wu2I4LRRStJa7Q-Walr64YnnzPdsJOHzbQLG4B2uZQ=s83-c-mo'}}
          />
        </TouchableOpacity>

        {/* User Modal creation */}
        
        <Modal 
          isVisible={userModal}
          hasBackdrop={true}
          backdropOpacity={.2}
          style={{ margin: 0 }}
          swipeDirection="down"
          onSwipeComplete={() => setUserModal(false)}
          onBackdropPress={() => setUserModal(false)}
          animationIn={'bounceIn'}
        >
          <ModalContainer>
              <ModalButton onPress={logOut}>
                <MaterialCommunityIcons name="logout-variant" size={24} color="white" style={{marginRight: 10}}/>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Iziet</Text>
              </ModalButton>
              <Text style={{opacity: .5, alignSelf: 'center'}}>ansisarthurdev.com</Text>
          </ModalContainer>
        </Modal>
    </Wrapper>
  )
}

const ModalButton = styled.TouchableOpacity`
background-color: #24282C;
padding: 15px 20px;
border-radius: 10px;
align-items: center;
margin: 20px 0 10px 0;
flex-direction: row;
align-items: center;
justify-content: center;
`

const ModalContainer = styled.View`
background: #F7F6F0;
position: absolute;
bottom: 0;
width: 100%;
padding: 20px 5% 20px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
`

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
padding: 0 5%;
margin-bottom: 40px;
margin-top: 10px;
`

export default UserBar