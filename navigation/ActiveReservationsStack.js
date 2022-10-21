import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();

//screens
import ActiveReservationsScreen from '../screens/ActiveReservationsScreen'
import CurrentActiveReservationScreen from '../screens/CurrentActiveReservationScreen';


const ActiveReservationStackNavigator = () => {
    //options={{headerShown: false}}

    return (
    <Stack.Navigator
        screenOptions={TransitionPresets.SlideFromRightIOS}
    >
        <Stack.Screen name="ActiveReservationsScreen" component={ActiveReservationsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CurrentActiveReservationScreen" component={CurrentActiveReservationScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
    );
}

export {ActiveReservationStackNavigator};