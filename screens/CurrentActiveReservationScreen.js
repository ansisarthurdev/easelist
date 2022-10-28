import React from 'react'
import styled from 'styled-components/native'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'

//icons
import { MaterialIcons } from '@expo/vector-icons';

//redux
import { useSelector } from 'react-redux';
import { selectReservation } from '../app/appSlice';

//firebase
import { db } from '../app/firebase';
import { updateDoc, doc, deleteDoc, increment } from 'firebase/firestore';

const CurrentActiveReservationScreen = () => {

    const navigation = useNavigation();
    const reservation = useSelector(selectReservation);

    const { addedBy, startDate, endDate, name } = reservation;
    const reservationData = JSON.parse(reservation?.reservation);

    const closeReservation = async () => {
        //make items available
        //set item available count 
        //delete active reservation

        for(let i=0; i < reservationData?.length; i++){
            updateDoc(doc(db, 'storage', reservationData[i]?.storageId, 'category', reservationData[i]?.categoryId, 'items', reservationData[i]?.itemId), {
                status: 'Noliktavā'
            });

            updateDoc(doc(db, 'storage', reservationData[i]?.storageId, 'category', reservationData[i]?.categoryId), {
                availableItems: increment(1)
            });
        }

        await deleteDoc(doc(db, "activeReservations", reservation?.id));

        navigation.navigate('ActiveReservationsScreen')
    }

  return (
    <Wrapper>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30}} onPress={() => navigation.navigate('ActiveReservationsScreen')}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Atpakaļ</Text>
        </TouchableOpacity>

        <Heading>
          <Text style={{fontWeight: 'bold', fontSize: 22, paddingBottom: 20}}>{name}</Text>
        </Heading>

        <ReservationInfo>
            <Text style={{fontWeight: 'bold', color: 'white', marginBottom: 10, fontSize: 17}}>{reservationData?.length} mantas</Text>
            <Text style={{color: 'white'}}>no {startDate?.date} līdz {endDate?.date}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                <Text style={{color: 'white'}}>Apstiprināja:</Text>
                <Avatar source={{uri: addedBy?.photoURL}}/>
                <Text style={{color: 'white'}}>{addedBy?.displayName}</Text>
            </View>
        </ReservationInfo>

        <ReservationEndBtn onPress={() => closeReservation()}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Noslēgt rezervāciju</Text>
        </ReservationEndBtn>

        <ReservationItems showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            {reservationData?.map(r => (
                <ReservationItem key={r?.itemId}>
                    <View>
                        <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center'}}>
                            <Text style={{color: '#24282C', fontWeight: 'bold'}}>{r?.name}</Text>
                        </View>
                    </View>

                    <Text>1gb</Text>
                </ReservationItem>
            ))}
            <View style={{width: '100%', height: 100}}></View>
        </ReservationItems>

    </Wrapper>
  )
}

const Avatar = styled.Image`
width: 30px;
height: 30px;
object-fit: cover;
border-radius: 180px;
margin: 0 6px 0 10px;
`

const ReservationItem = styled.View`
background: white;
padding: 15px 25px;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;
border-radius: 10px;
`

const ReservationEndBtn = styled.TouchableOpacity`
background-color: #24282C;
padding: 15px 20px;
border-radius: 10px;
align-items: center;
margin: 20px 0;
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

export default CurrentActiveReservationScreen