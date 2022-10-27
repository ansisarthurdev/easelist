import React, { useState, useEffect } from 'react'

//screen navigation
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './Tabs';
import Splash from '../components/Splash'
import LoginScreen from '../screens/LoginScreen'

//firebase
import { auth } from '../app/firebase'

//redux
import { selectUser, setUser } from '../app/appSlice';
import { useSelector, useDispatch } from 'react-redux';

const Navigation = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const checkIfLogged = () => {
    const unsubscribe = auth.onAuthStateChanged(auth => {
      if(auth){
        dispatch(setUser(auth))
      }
    })
  }

  useEffect(() => {
    checkIfLogged();
  }, [])
  
  return (
      <NavigationContainer>
        {user ? <LoginScreen /> : <Tabs />}
      </NavigationContainer>
  )
}

export default Navigation