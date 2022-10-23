import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();

//screens
import ReservationsScreen from '../screens/ReservationsScreen'
import CurrentReservationScreen from '../screens/CurrentReservationScreen'

const ReservationNavigator = () => {
    //options={{headerShown: false}}

    return (
    <Stack.Navigator
        screenOptions={TransitionPresets.SlideFromRightIOS}
    >
        <Stack.Screen name="ReservationsScreen" component={ReservationsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ReservationScreen" component={CurrentReservationScreen} options={{headerShown: false}}/>

    </Stack.Navigator>
    );
}

export {ReservationNavigator};