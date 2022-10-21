import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

//icons
import { Octicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'


const Storages = () => {

    const navigation = useNavigation();
    const [storagesMenu, openStorages] = useState(false);
    const storages = ['Noliktava nr. 1', 'Noliktava nr. 2', 'Noliktava nr. 3'];

  return (
    <Wrapper showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <StoragesContainer>
            <Text style={{color: '#24282C', fontWeight: 'bold', fontSize: 18}}>Noliktavas ({storages?.length})</Text>
            <AddButton><Text style={{color: '#24282C', fontSize: 18, fontWeight: 'bold'}}>+</Text></AddButton>
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

        <AddStorageBtn style={{marginTop: storagesMenu ? 30 : 0}}><Text style={{color: 'white', fontWeight: 'bold'}}>Pievienot</Text></AddStorageBtn>

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
    </Wrapper>
  )
}

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