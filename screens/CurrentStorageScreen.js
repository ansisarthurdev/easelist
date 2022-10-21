import React from 'react'
import styled from 'styled-components/native'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'

//icons
import { MaterialIcons } from '@expo/vector-icons';

const CurrentStorageScreen = () => {

  const navigation = useNavigation();

  return (
    <Wrapper>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30}} onPress={() => navigation.navigate('StorageScreen')}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Atpakaļ</Text>
        </TouchableOpacity>

        <ItemInfoContainer showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <Heading>
            <Text style={{fontWeight: 'bold', fontSize: 22}}>Noliktava nr. 1</Text>
            <AddButton><Text style={{color: '#24282C', fontSize: 18, fontWeight: 'bold'}}>+</Text></AddButton>
          </Heading>

          <ItemInfo>
            <View style={{flexDirection: 'row', backgroundColor: '#F7F6F0', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10}}>
              <Text style={{fontSize: 18, marginRight: 20}}>Spilvens</Text>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>9/10</Text>
            </View>

            <Text style={{fontWeight: 'bold', fontSize: 18, paddingRight: 15}}>Statuss</Text>
          </ItemInfo>

          <Items>
            <Item>
              <View><Text>W1 Spilvens</Text></View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontWeight: 'bold'}}>Noliktavā</Text>
              </View>
            </Item>

            <Item>
              <View><Text>W1 Spilvens</Text></View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontWeight: 'bold'}}>Rezervēts</Text>
                <Text style={{fontWeight: 'bold'}}>(Jānis Kalniņš)</Text>
              </View>
            </Item>

            <Item>
              <View><Text>W1 Spilvens</Text></View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontWeight: 'bold'}}>Noliktavā</Text>
              </View>
            </Item>

            <Item>
              <View><Text>W1 Spilvens</Text></View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontWeight: 'bold'}}>Noliktavā</Text>
              </View>
            </Item>

            <Item>
              <View><Text>W1 Spilvens</Text></View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontWeight: 'bold'}}>Noliktavā</Text>
              </View>
            </Item>

            <Item>
              <View><Text>W1 Spilvens</Text></View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontWeight: 'bold'}}>Noliktavā</Text>
              </View>
            </Item>

            <Item>
              <View><Text>W1 Spilvens</Text></View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontWeight: 'bold'}}>Noliktavā</Text>
              </View>
            </Item>

            <Item>
              <View><Text>W1 Spilvens</Text></View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontWeight: 'bold'}}>Noliktavā</Text>
              </View>
            </Item>

            <Item>
              <View><Text>W1 Spilvens</Text></View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontWeight: 'bold'}}>Noliktavā</Text>
              </View>
            </Item>

            <Item>
              <View><Text>W1 Spilvens</Text></View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontWeight: 'bold'}}>Noliktavā</Text>
              </View>
            </Item>

            <View style={{width: '100%', height: 100}}></View>
          </Items>

        </ItemInfoContainer>


    </Wrapper>
  )
}

const Item = styled.View`
background-color: white;
margin-bottom: 10px;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 15px;
border-radius: 10px;
`

const Items = styled.View``

const ItemInfo = styled.View`
flex-direction: row;
justify-content: space-between; 
align-items: center;
margin: 20px 0 30px 0;
`

const AddButton = styled.TouchableOpacity`
background-color: #D3F36B;
padding: 8px 16px;
border-radius: 180px;
`

const Heading = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`

const ItemInfoContainer = styled.ScrollView``

const Wrapper = styled.View`
background-color: #D9D9D9;
display: flex;
height: 100%;
padding: 40px 5% 0;
`

export default CurrentStorageScreen