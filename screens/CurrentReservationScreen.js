import React from 'react'
import styled from 'styled-components/native'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'

//icons
import { MaterialIcons } from '@expo/vector-icons';


const CurrentReservationScreen = () => {

    const navigation = useNavigation();

  return (
    <Wrapper>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30}} onPress={() => navigation.navigate('ReservationsScreen')}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Atpakaļ</Text>
        </TouchableOpacity>

        <Heading>
          <Text style={{fontWeight: 'bold', fontSize: 22, paddingBottom: 20}}>Jānis Kalniņš</Text>
        </Heading>

        <ReservationInfo>
            <Text style={{fontWeight: 'bold', color: 'white', marginBottom: 10, fontSize: 17}}>10 mantas</Text>
            <Text style={{color: 'white'}}>no 10.10.2022 līdz 21.10.2022</Text>
        </ReservationInfo>

        <ReservationStartBtn>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Nodot mantas lietošanā</Text>
        </ReservationStartBtn>

        <ReservationDeleteBtn>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Dzēst</Text>
        </ReservationDeleteBtn>

        <ReservationItems showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <ReservationItem>
                <View>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center'}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>Spilvens</Text>
                    </View>
                </View>

                <Text>4gb</Text>
            </ReservationItem>

            <ReservationItem>
                <View>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center'}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>Spilvens</Text>
                    </View>
                </View>

                <Text>4gb</Text>
            </ReservationItem>

            <ReservationItem>
                <View>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center'}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>Spilvens</Text>
                    </View>
                </View>

                <Text>4gb</Text>
            </ReservationItem>

            <ReservationItem>
                <View>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center'}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>Spilvens</Text>
                    </View>
                </View>

                <Text>4gb</Text>
            </ReservationItem>

            <ReservationItem>
                <View>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center'}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>Spilvens</Text>
                    </View>
                </View>

                <Text>4gb</Text>
            </ReservationItem>

            <ReservationItem>
                <View>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center'}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>Spilvens</Text>
                    </View>
                </View>

                <Text>4gb</Text>
            </ReservationItem>

            <ReservationItem>
                <View>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center'}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>Spilvens</Text>
                    </View>
                </View>

                <Text>4gb</Text>
            </ReservationItem>

            <ReservationItem>
                <View>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center'}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>Spilvens</Text>
                    </View>
                </View>

                <Text>4gb</Text>
            </ReservationItem>

            <View style={{width: '100%', height: 100}}></View>
        </ReservationItems>

    </Wrapper>
  )
}

const ReservationItem = styled.View`
background: white;
padding: 15px 25px;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;
border-radius: 10px;
`

const ReservationDeleteBtn = styled.TouchableOpacity`
background-color: #6A6A6A;
padding: 15px 20px;
border-radius: 10px;
align-items: center;
margin-bottom: 20px;
`

const ReservationStartBtn = styled.TouchableOpacity`
background-color: #24282C;
padding: 15px 20px;
border-radius: 10px;
align-items: center;
margin: 20px 0 10px 0;
`

const ReservationItems = styled.ScrollView`
`

const ReservationInfo = styled.View`
background-color: #24282C;
padding: 15px 20px;
border-radius: 10px;
`

const Heading = styled.View``

const Wrapper = styled.View`
background-color: #D9D9D9;
display: flex;
height: 100%;
padding: 50px 5% 0;
`

export default CurrentReservationScreen