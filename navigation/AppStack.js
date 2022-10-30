import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();

//screens
import LoginScreen from '../screens/LoginScreen';
import Tabs from './Tabs';

const AppStack = () => {
    //options={{headerShown: false}}

    return (
    <Stack.Navigator
        screenOptions={TransitionPresets.SlideFromRightIOS}
    >
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="App" component={Tabs} options={{headerShown: false}}/>
    </Stack.Navigator>
    );
}

export default AppStack;