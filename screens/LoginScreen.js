import React, { useEffect } from 'react'
import styled from 'styled-components'

//firebase google login
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { auth } from '../app/firebase'

//icons
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

//keys
import { CLIENT_ID, ANDROID_CLIENT_ID } from '@env';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID
    },
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response])

  return (
    <Wrapper>
        <FontAwesome5 name="warehouse" size={24} color='#24282C' />
        <Text>easelist</Text>
        <DescriptionText>Menidžē savus produktus vienuviet.</DescriptionText>

        <LoginBtn onPress={() => promptAsync()}>
          <LoginBtnIcon>
            <AntDesign name="google" size={24} color="white" />
          </LoginBtnIcon>
          <Text style={{fontWeight: 'bold', color: 'white'}}>Google</Text>
        </LoginBtn>
    </Wrapper>
  )
}

const LoginBtnIcon = styled.View`
position: relative;
bottom: -2px;
margin-right: 20px;
`

const LoginBtn = styled.TouchableOpacity`
background-color: #24282C;
border-radius: 10px;
align-items: center;
padding: 5px 20px 10px;
flex-direction: row;
align-items: center;
justify-content: center;
width: 60%;
`

const DescriptionText = styled.Text`
font-weight: bold;
opacity: .5;
margin: 10px 0px 30px;
`

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

export default LoginScreen