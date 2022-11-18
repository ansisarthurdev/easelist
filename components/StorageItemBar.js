import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

//icons
import { AntDesign, Ionicons } from '@expo/vector-icons';

const StorageItemBar = ({item}) => {

    const [bgColor, setBgColor] = useState('');

    const generateBackgroundColor = () => {
        item.priority === 'Special' && item.status === 'Noliktavā' && setBgColor('#aa66cc');
        item.priority === 'Standart' && item.status === 'Noliktavā' && setBgColor('#00C851');

        item.priority === 'Standart' && item.status === 'Rezervēts' && setBgColor('#ffbb33');
        item.priority === 'Special' && item.status === 'Rezervēts' && setBgColor('#ffbb33');

        item.priority === 'Standart' && item.status === 'Lietošanā' && setBgColor('#ff4444');
        item.priority === 'Special' && item.status === 'Lietošanā' && setBgColor('#ff4444');

    }

    useEffect(() => {
        generateBackgroundColor();
    }, [])

  return (
    <Wrapper style={{backgroundColor: bgColor}}>
        <View style={{width: '70%', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginRight: 10}}>
                {bgColor === '#aa66cc' && <AntDesign name="checkcircleo" size={24} color="black" />}
                {bgColor === '#00C851' && <AntDesign name="checkcircleo" size={24} color="black" />}
                {bgColor === '#ffbb33' && <Ionicons name="ios-pencil" size={24} color="black" />}
                {bgColor === '#ff4444' && <AntDesign name="clockcircleo" size={24} color="black" />}
                
            </View>
            <View>
                <Text>{item.name}</Text>
                {item.description.length > 0 && <Text style={{opacity: .8, fontSize: 12}} numberOfLines={1}>{item.description}</Text>}  
            </View>
        </View>

        <View style={{alignItems: 'flex-end', width: '20%'}}>
            {item.status === 'Noliktavā' && <Text style={{fontWeight: 'bold'}}>{item.status}</Text>}
            {item.status === 'Rezervēts' && <>
                <Text style={{fontWeight: 'bold'}}>{item.status}</Text>
                <Text style={{fontWeight: 'bold'}}>{item.reservationName}</Text>
            </>}
            {item.status === 'Lietošanā' && <>
                <Text style={{fontWeight: 'bold'}}>{item.status}</Text>
                <Text style={{fontWeight: 'bold'}}>{item.reservationName}</Text>
            </>}
        </View>
    </Wrapper>
  )
}

const Wrapper = styled.TouchableOpacity`
background-color: white;
margin-bottom: 10px;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 15px;
border-radius: 10px;
`

export default StorageItemBar