import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, TextInput } from 'react-native'

//components
import Modal from "react-native-modal";
import Loading from './Loading'
import StorageBar from './StorageBar'
import SearchBox from './SearchBox';

//firebase
import { doc, onSnapshot, collection, addDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { db } from '../app/firebase'

//redux
import { useDispatch } from 'react-redux'
import { setStorages } from '../app/appSlice'

const Storages = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [creationStatus, setCreationStatus] = useState(false);
    const [alert, setAlert] = useState('');

    //storages
    const [create, setCreate] = useState(false);
    const [storageName, setStorageName] = useState('');
    const [storagesInfo, setStoragesInfo] = useState(null);

    //create storage
    const createStorage = async () => {
        //...create storage function
        if(storageName?.length > 0){
            setCreationStatus(true);
            const docRef = await addDoc(collection(db, "storage"), {
                name: storageName,
            });
    
            const newStorageRef = doc(db, "storage", docRef.id);
            const storagesInfoRef = doc(db, 'storagesInfo', 'storagesInfo');
            
            await updateDoc(newStorageRef, {
                id: docRef.id
            });
    
            await updateDoc(storagesInfoRef, {
                storages: arrayUnion({name: storageName, id: docRef.id})
            });
    
            setCreate(false);
            setStorageName('');
            setAlert('');
            setCreationStatus(false);
        } else {
            setAlert('Lūdzu ievadi nosaukumu!')
        }

    }

    //get storages
    const getStorages = async () => {
        const unsub = onSnapshot(doc(db, "storagesInfo", "storagesInfo"), (doc) => {
            setStoragesInfo(doc.data());
            dispatch(setStorages(doc.data()));

            console.log(storagesInfo);
        });

        setLoading(false);

        return unsub;
    }

    useEffect(() => {
        getStorages();
    }, [])


  return (
    <Wrapper showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {!loading ? <>
        <StoragesContainer>
            <Text style={{color: '#24282C', fontWeight: 'bold', fontSize: 18}}>Noliktavas {storagesInfo?.storages?.length > 0 && `(${storagesInfo?.storages?.length})`}</Text>
            <AddButton onPress={() => setCreate(true)}><Text style={{color: '#24282C', fontSize: 18, fontWeight: 'bold'}}>+</Text></AddButton>
        </StoragesContainer>

        <View style={{width: '100%', height: 1, backgroundColor: '#6A6A6A', marginVertical: 15}} />

        <SearchBox />

        {storagesInfo?.storages?.length > 0 && <>
 
            <StorageContainer>
                {storagesInfo?.storages.map(storage => {
                    return (
                        <StorageBar key={storage.id} storage={storage}/>
                    ) 
                })}
            </StorageContainer>
        </>} 

        {/*Space from bottom for scrolling*/}
        <View style={{width: '100%', height: 100}}></View>
        </> : <Loading />}


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
                {creationStatus ? <Loading /> : <>
                    <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Pievienot noliktavu</Text>
                    {alert && <AlertContainer><AlertText>{alert}</AlertText></AlertContainer>}
                    <InputContainer>
                        <TextInput placeholder='Noliktavas nosaukums' onChangeText={setStorageName} value={storageName}/>
                    </InputContainer>
                    <ModalButton onPress={createStorage}><Text style={{color: 'white', fontWeight: 'bold'}}>Pievienot</Text></ModalButton>
                </>}
            </ModalContainer>
        </Modal>

    </Wrapper>
  )
}

const AlertText = styled.Text`
color: white;
text-align: center;
`

const AlertContainer = styled.View`
background: #C50000;
padding: 10px 15px;
margin-bottom: 20px;
border-radius: 10px;
`

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

const StorageContainer = styled.View``

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