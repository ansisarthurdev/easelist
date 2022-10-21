import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();

//screens
import StorageScreen from '../screens/StorageScreen'
import CurrentStorage from '../screens/CurrentStorageScreen'


const StorageStackNavigator = () => {
    //options={{headerShown: false}}

    return (
    <Stack.Navigator
        screenOptions={TransitionPresets.SlideFromRightIOS}
    >
        <Stack.Screen name="StorageScreen" component={StorageScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CurrentStorageScreen" component={CurrentStorage} options={{headerShown: false}}/>
    </Stack.Navigator>
    );
}

export {StorageStackNavigator};