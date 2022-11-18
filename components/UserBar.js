import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native';

//icons
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

//components
import Modal from "react-native-modal";

//firebase
import { auth } from '../app/firebase';

//redux
import { selectUser, setUser } from '../app/appSlice'
import { useSelector, useDispatch } from 'react-redux';

const UserBar = () => {

  const dispatch = useDispatch();
  const [userModal, setUserModal] = useState(false);
  const user = useSelector(selectUser);
  const navigation = useNavigation();

  const logOut = () => {
    //..
    auth.signOut();
    setUserModal(false);

    setTimeout(() => {
      dispatch(setUser(null));
      navigation.replace('LoginScreen');
    }, 500)
  }

  return (
    <Wrapper>
        <View>
            <TextWelcome>Prieks tevi redzēt,</TextWelcome>
            <TextUser>{user?.displayName ? user?.displayName : user?.email}</TextUser>
        </View>

        <TouchableOpacity onPress={() => setUserModal(true)} style={{marginRight: 10}}>
          <FontAwesome5 name="user" size={24} color="black" />
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
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <View style={{opacity: .5}}>
                <Text>Tavs lietotājvārds:</Text>
                <Text>{user?.displayName ? user?.displayName : user?.email}</Text>
              </View>
              <ModalButton onPress={logOut}>
                <MaterialCommunityIcons name="logout-variant" size={24} color="white" style={{marginRight: 10}}/>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Iziet</Text>
              </ModalButton>
            </View>

            <Text style={{opacity: .5, alignSelf: 'center'}}>ansisarthurdev.com</Text>
            <Text style={{opacity: .5, alignSelf: 'center', fontSize: 10}}>easelist - v1.0.1</Text>
          </ModalContainer>
        </Modal>
    </Wrapper>
  )
}

const ModalButton = styled.TouchableOpacity`
background-color: #24282C;
padding: 10px 20px;
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
margin: 10px 0 20px 0;
`

export default UserBar