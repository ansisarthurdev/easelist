import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { TextInput, TouchableOpacity } from 'react-native'

//icons
import { FontAwesome5 } from '@expo/vector-icons';

//firebase login
import { auth } from '../app/firebase'
import { onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

//redux
import { selectUser, setUser } from '../app/appSlice';
import { useSelector, useDispatch } from 'react-redux';

//components
import Loading from '../components/Loading'

const LoginScreen = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const [loadingState, setLoading] = useState(true);

  //register or login state
  const [app, setApp] = useState('Login');

  //login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //register
  const [name, setName] = useState('');

  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.providerData[0]));
        navigation.replace('App');
      } else {
        setLoading(false);
      }
    });
  }

  const clearInputs = () => {
    setEmail('');
    setPassword('');
    setName('');
  }

  const register = () => {
    if(name.length !== 0, email.length !== 0, password.length !== 0){
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(auth.currentUser, { displayName: name })
        clearInputs();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    }
  }

  const login = () => {
    if(email.length !== 0, password.length !== 0){
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
    }
  }

  useEffect(() => {
    checkUser();
  }, [])

  return (
    <Wrapper>
        {loadingState ? <Loading /> : <>
          <FontAwesome5 name="warehouse" size={24} color='#24282C' />
          <Text>easelist</Text>
          <DescriptionText>Menidžē savus produktus vienuviet.</DescriptionText>

          {app === 'Login' && <>
            <AuthView>
              <InputContainer>
                  <TextInput placeholder='E-pasts' onChangeText={setEmail} value={email}/>
              </InputContainer>

              <InputContainer>
                  <TextInput secureTextEntry={true} placeholder='Parole' onChangeText={setPassword} value={password} />
              </InputContainer>
            </AuthView>

            <LoginBtn onPress={() => login()}><Text style={{fontWeight: 'bold', color: 'white'}}>Ieiet</Text></LoginBtn>

            <TouchableOpacity onPress={() => setApp('Register')} style={{marginTop: 10}}>
              <Text style={{fontSize: 12, opacity: .5, textDecoration: 'underline black'}}>Neesi reģistrējies?</Text>
            </TouchableOpacity>
          </>}

          {app === 'Register' && <>
            <AuthView>
              <InputContainer>
                  <TextInput placeholder='Lietotājvārds' onChangeText={setName} value={name}/>
              </InputContainer>

              <InputContainer>
                  <TextInput placeholder='E-pasts' onChangeText={setEmail} value={email}/>
              </InputContainer>

              <InputContainer>
                  <TextInput secureTextEntry={true} placeholder='Parole' onChangeText={setPassword} value={password} />
              </InputContainer>
            </AuthView>

            <LoginBtn onPress={() => register()}><Text style={{fontWeight: 'bold', color: 'white'}}>Reģistrēties</Text></LoginBtn>

            <TouchableOpacity onPress={() => setApp('Login')} style={{marginTop: 10}}>
              <Text style={{fontSize: 12, opacity: .5, textDecoration: 'underline black'}}>Esi jau reģistrējies?</Text>
            </TouchableOpacity>
          </>}

        </>}
    </Wrapper>
  )
}

const InputContainer = styled.View`
width: 100%;
background: #6a6a6a50;
padding: 10px 15px;
border-radius: 10px;
margin: 0 0 10px 0;
`

const AuthView = styled.View`
width: 60%;
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
margin: 10px 0 0 0;
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
background-color: #D9D9D9;
`

export default LoginScreen