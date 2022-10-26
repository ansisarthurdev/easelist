import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/core'

//icons
import { MaterialIcons } from '@expo/vector-icons';

//components
import Modal from "react-native-modal";

const CurrentStorageScreen = () => {

  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState(1);

  return (
    <Wrapper>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30}} onPress={() => navigation.navigate('StorageScreen')}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Atpakaļ</Text>
        </TouchableOpacity>

        <ItemInfoContainer showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <Heading>
            <Text style={{fontWeight: 'bold', fontSize: 22}}>Noliktava nr. 1</Text>
            <AddButton onPress={() => setModal(true)}><Text style={{color: '#24282C', fontSize: 18, fontWeight: 'bold'}}>+</Text></AddButton>
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


        {/* Adding category item modal */}
        
        <Modal 
          isVisible={modal}
          hasBackdrop={true}
          backdropOpacity={.2}
          style={{ margin: 0 }}
          swipeDirection="down"
          onSwipeComplete={() => setModal(false)}
          onBackdropPress={() => setModal(false)}
          animationIn={'slideInUp'}
        >
          <ModalContainer>
              <ModalItems>
                <ModalItem style={{width: '70%'}}>
                  <ModalItemHeading>Nosaukums</ModalItemHeading>
                  <InputContainer>
                    <TextInput cursorColor='#24282C' placeholder='Nosaukums' onChangeText={setName} value={name}/>
                  </InputContainer>
                </ModalItem>

                <ModalItem style={{width: '20%'}}>
                  <ModalItemHeading>Skaits</ModalItemHeading>
                  <InputContainer>
                    <TextInput cursorColor='#24282C' placeholder='0' keyboardType='number-pad' onChangeText={setNumber} value={number} />
                  </InputContainer>
                </ModalItem>
              </ModalItems>

              <ModalButton>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Pievienot</Text>
              </ModalButton>
          </ModalContainer>
        </Modal>

    </Wrapper>
  )
}

const InputContainer = styled.View`
width: 100%;
background: #6A6A6A50;
padding: 5px 10px;
border-radius: 10px;
`

const ModalItemHeading = styled.Text`
font-weight: bold;
font-size: 16px;
margin-bottom: 20px;
`

const ModalItems = styled.View`
flex-direction: row;
justify-content: space-between;
`

const ModalItem = styled.View`

`

const ModalButton = styled.TouchableOpacity`
background-color: #24282C;
padding: 15px 20px;
border-radius: 10px;
align-items: center;
margin: 20px 0 10px 0;
flex-direction: row;
align-items: center;
justify-content: center;
`

const ModalContainer = styled.View`
background: #F7F6F0;
position: absolute;
bottom: 0;
width: 100%;
padding: 20px 5% 20px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
`

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
padding: 50px 5% 0;
`

export default CurrentStorageScreen