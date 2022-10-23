import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/core'


//icons
import { Octicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'

//components
import Modal from "react-native-modal";


const Storages = () => {

    const navigation = useNavigation();
    const [storagesMenu, openStorages] = useState(false);

    //storages
    const [create, setCreate] = useState(false);
    const [storageName, setStorageName] = useState('');
    const storages = ['Noliktava nr. 1', 'Noliktava nr. 2', 'Noliktava nr. 3'];

    const createStorage = () => {
        //...create storage function

        setCreate(false);
        setStorageName('');
    }

    //storages category
    const [category, setCategory] = useState(false);

    const createCategory = () => {
        //...create storage function

        setCategory(false);
        setStorageName('');
    }

  return (
    <Wrapper showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <StoragesContainer>
            <Text style={{color: '#24282C', fontWeight: 'bold', fontSize: 18}}>Noliktavas ({storages?.length})</Text>
            <AddButton onPress={() => setCreate(true)}><Text style={{color: '#24282C', fontSize: 18, fontWeight: 'bold'}}>+</Text></AddButton>
        </StoragesContainer>

        <View style={{width: '100%', height: 1, backgroundColor: '#6A6A6A', marginVertical: 15}} />

        <DropDownHeading onPress={() => openStorages(!storagesMenu)}>
            <Text style={{color: '#24282C', fontWeight: 'bold', fontSize: 18}}>Noliktava nr. 1</Text>
            {storagesMenu ? <Octicons name="triangle-down" size={24} color="black"/> : <Octicons name="triangle-up" size={24} color="black"/>}
        </DropDownHeading>

        {storagesMenu &&
        <DropDownContent>
            {storages.map(storage => {

                return(
                    <DropDownItem key={storage}>
                        <Text>{storage}</Text>
                    </DropDownItem>
                )
            })}
        </DropDownContent>
        }

        <AddStorageBtn onPress={() => setCategory(!category)} style={{marginTop: storagesMenu ? 30 : 0}}><Text style={{color: 'white', fontWeight: 'bold'}}>Pievienot</Text></AddStorageBtn>

        <StorageContainer>

            <StorageItem>
                <View>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>Spilvens</Text>
                    </View>

                    <View style={{marginLeft: 10}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>20/25</Text>
                    </View>
                </View>

                <ArrowRightCircle onPress={() => navigation.navigate('CurrentStorageScreen')}>
                    <Feather name="arrow-right" size={24} color="black" />
                </ArrowRightCircle>
            </StorageItem>

            <StorageItem>
                <View>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>Spilvens</Text>
                    </View>

                    <View style={{marginLeft: 10}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>20/25</Text>
                    </View>
                </View>

                <ArrowRightCircle>
                    <Feather name="arrow-right" size={24} color="black" />
                </ArrowRightCircle>
            </StorageItem>

            <StorageItem>
                <View>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>Spilvens</Text>
                    </View>

                    <View style={{marginLeft: 10}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>20/25</Text>
                    </View>
                </View>

                <ArrowRightCircle>
                    <Feather name="arrow-right" size={24} color="black" />
                </ArrowRightCircle>
            </StorageItem>

            <StorageItem>
                <View>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>Spilvens</Text>
                    </View>

                    <View style={{marginLeft: 10}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>20/25</Text>
                    </View>
                </View>

                <ArrowRightCircle>
                    <Feather name="arrow-right" size={24} color="black" />
                </ArrowRightCircle>
            </StorageItem>

        </StorageContainer>

        <View style={{width: '100%', height: 100}}></View>


        {/* Modals */}

        {/* Storage creation */}
        <Modal 
            isVisible={create}
            hasBackdrop={true}
            backdropOpacity={.2}
            style={{ margin: 0 }}
            swipeDirection="down"
            onSwipeComplete={() => setCreate(false)}
            onBackdropPress={() => setCreate(false)}
        >
            <ModalContainer>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Pievienot noliktavu</Text>
                <InputContainer>
                    <TextInput placeholder='Noliktavas nosaukums' onChangeText={setStorageName} value={storageName}/>
                </InputContainer>
                <ModalButton onPress={createStorage}><Text style={{color: 'white', fontWeight: 'bold'}}>Pievienot</Text></ModalButton>
            </ModalContainer>
        </Modal>

        {/* Storage category creation */}
        <Modal 
            isVisible={category}
            hasBackdrop={true}
            backdropOpacity={.2}
            style={{ margin: 0 }}
            swipeDirection="down"
            onSwipeComplete={() => setCategory(false)}
            onBackdropPress={() => setCategory(false)}
        >
            <ModalContainer>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Pievienot kategoriju</Text>
                
                <InputContainer>
                    <TextInput placeholder='Kategorijas nosaukums' onChangeText={setStorageName} value={storageName}/>
                </InputContainer>
                
                <ModalButton onPress={createCategory}><Text style={{color: 'white', fontWeight: 'bold'}}>Pievienot</Text></ModalButton>
            </ModalContainer>
        </Modal>

    </Wrapper>
  )
}

const InputContainer = styled.View`
width: 100%;
background: #6a6a6a50;
padding: 10px 15px;
border-radius: 10px;
`

const ModalButton = styled.TouchableOpacity`
background-color: #24282C;
padding: 15px 20px;
border-radius: 10px;
align-items: center;
margin: 20px 0 10px 0;
`

const ModalContainer = styled.View`
background: #F7F6F0;
position: absolute;
bottom: 0;
width: 100%;
padding: 20px 5% 40px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
`

const ArrowRightCircle = styled.TouchableOpacity`
background-color: #D3F36B;
height: 40px;
flex-direction: row;
align-items: center;
padding: 0 8px;
border-radius: 180px;
`

const StorageItem = styled.View`
background: white;
padding: 15px 25px;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;
border-radius: 10px;
`

const StorageContainer = styled.View``

const DropDownItem = styled.TouchableOpacity`
padding: 15px;
margin-bottom: 10px;
background: white;
border-radius: 10px;
`

const DropDownContent = styled.View``

const AddStorageBtn = styled.TouchableOpacity`
margin-bottom: 30px;
width: 100%;
background-color: #24282C;
padding: 15px;
flex-direction: row;
justify-content: center;
border-radius: 10px;
`

const DropDownHeading = styled.TouchableOpacity`
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 5px 15px 5px 0;
margin-bottom: 10px;
`

const AddButton = styled.TouchableOpacity`
background-color: #D3F36B;
padding: 8px 16px;
border-radius: 180px;
`

const StoragesContainer = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
`

const Text = styled.Text``

const Wrapper = styled.ScrollView`
padding: 0 5%;
`

export default Storages