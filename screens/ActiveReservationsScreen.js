import React from 'react'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

//icons
import { Feather } from '@expo/vector-icons'

const ActiveReservationsScreen = () => {

  const navigation = useNavigation();

  return (
    <Wrapper>
        <Heading>
          <Text style={{fontWeight: 'bold', fontSize: 22, paddingBottom: 20}}>Mantas lietošanā</Text>
        </Heading>

        <Reservations showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

          <Reservation>
            <View>
                <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10, alignItems: 'center'}}>
                    <Text style={{color: '#24282C', fontWeight: 'bold'}}>Jānis Kalniņš</Text>
                </View>

                <View style={{marginLeft: 10}}>
                    <Text style={{color: '#24282C', fontWeight: 'bold'}}>10 mantas - līdz 21.10.2022</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10}}>
                    <Avatar source={{uri: 'https://lh3.googleusercontent.com/a/ALm5wu2I4LRRStJa7Q-Walr64YnnzPdsJOHzbQLG4B2uZQ=s83-c-mo'}}/>
                    <Text>ansisarthurdev</Text>
                </View>
            </View>

            <ArrowRightCircle onPress={() => navigation.navigate('CurrentActiveReservationScreen')}>
                <Feather name="arrow-right" size={24} color="black" />
            </ArrowRightCircle>

            </Reservation>

            <Reservation>
            <View>
                <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10, alignItems: 'center'}}>
                    <Text style={{color: '#24282C', fontWeight: 'bold'}}>Jānis Kalniņš</Text>
                </View>

                <View style={{marginLeft: 10}}>
                    <Text style={{color: '#24282C', fontWeight: 'bold'}}>10 mantas - līdz 21.10.2022</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10}}>
                    <Avatar source={{uri: 'https://lh3.googleusercontent.com/a/ALm5wu2I4LRRStJa7Q-Walr64YnnzPdsJOHzbQLG4B2uZQ=s83-c-mo'}}/>
                    <Text>ansisarthurdev</Text>
                </View>
            </View>

            <ArrowRightCircle>
                <Feather name="arrow-right" size={24} color="black" />
            </ArrowRightCircle>
            </Reservation>


            <View style={{width: '100%', height: 100}}></View>
        </Reservations>
    </Wrapper>
  )
}

const Avatar = styled.Image`
width: 30px;
height: 30px;
object-fit: cover;
border-radius: 180px;
margin: 0 10px 0 0;
`

const ArrowRightCircle = styled.TouchableOpacity`
background-color: #D3F36B;
height: 40px;
flex-direction: row;
align-items: center;
padding: 0 8px;
border-radius: 180px;
`

const Reservation = styled.View`
background: white;
padding: 15px 25px;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;
border-radius: 10px;
`

const Reservations = styled.ScrollView``

const Heading = styled.View``

const Wrapper = styled.View`
background-color: #D9D9D9;
display: flex;
height: 100%;
padding: 40px 5% 0;
`

export default ActiveReservationsScreen