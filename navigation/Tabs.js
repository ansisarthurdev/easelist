import React from 'react'
import styled from 'styled-components/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//screens
import { StorageStackNavigator } from './StorageStack'
import { ActiveReservationStackNavigator } from './ActiveReservationsStack'

//icons
import { FontAwesome5 } from '@expo/vector-icons';
 
const Tab = createBottomTabNavigator();

const Tabs = () => {

    //options={{headerShown: false}}

    return (
    <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: { 
                height: 70,
                position: 'absolute',
                bottom: 0,
                overflow: 'hidden',
                backgroundColor: '#D9D9D9'
            },
        }}
    >
        <Tab.Screen 
            name="StorageInfo" 
            component={StorageStackNavigator}
            options={{
                tabBarIcon: ({focused}) => (
                    <Container>
                        {focused ? <FontAwesome5 name="warehouse" size={18} color='#24282C' /> : <FontAwesome5 name="warehouse" size={18} color='#6A6A6A' />}
                    </Container>
                ),
                headerShown: false,
            }}
        />

        <Tab.Screen 
            name="StorageUsage" 
            component={ActiveReservationStackNavigator} 
            options={{
                tabBarIcon: ({focused}) => (
                    <Container>
                        {focused ? <FontAwesome5 name="calendar-alt" size={18} color='#24282C' /> : <FontAwesome5 name="calendar-alt" size={18} color='#6A6A6A' />}
                    </Container>
                ),
                headerShown: false
            }}
        />

        <Tab.Screen 
            name="StorageReservation" 
            component={StorageStackNavigator} 
            options={{
                tabBarIcon: ({focused}) => (
                    <Container>
                        {focused ? <FontAwesome5 name="pencil-alt" size={18} color='#24282C' /> : <FontAwesome5 name="pencil-alt" size={18} color='#6A6A6A' />}
                    </Container>
                ),
                headerShown: false
            }}
        />
    </Tab.Navigator>
  );
}

export default Tabs;

const Container = styled.View`
display: flex;
align-items: center;
justify-content: center;
height: 100%;
`
const Text = styled.Text``