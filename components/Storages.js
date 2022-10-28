import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/core'


//icons
import { Octicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'

//components
import Modal from "react-native-modal";

//firebase
import { doc, onSnapshot, collection, addDoc, updateDoc, arrayUnion, query, orderBy, serverTimestamp } from "firebase/firestore"; 
import { db } from '../app/firebase'

//redux
import { useDispatch } from 'react-redux'
import { setCategoryState, setStorages } from '../app/appSlice'

const Storages = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [storagesMenu, openStorages] = useState(false);

    //storages
    const [create, setCreate] = useState(false);
    const [storageName, setStorageName] = useState('');

    const [storagesInfo, setStoragesInfo] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);

    const createStorage = async () => {
        //...create storage function
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
    }

    //storages category
    const [category, setCategory] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);

    const createCategory = async () => {
        //...create storage function
        const selected = selectedStorage.id;

        const docRef = await addDoc(collection(db, "storage", selected, "category"), {
            name: categoryName,
            totalItems: 0,
            availableItems: 0,
            timestamp: serverTimestamp(),
        });

        await updateDoc(doc(db, 'storage', selectedStorage.id, "category", docRef.id), {
            id: docRef.id
        })

        setCategory(false);
        setCategoryName('');
    }

    //get storages
    const getStorages = async () => {
        const unsub = onSnapshot(doc(db, "storagesInfo", "storagesInfo"), (doc) => {
            setStoragesInfo(doc.data());
            dispatch(setStorages(doc.data()));
            setSelectedStorage(doc.data().storages[0]);
        });

        return unsub;
    }

    //get categories
    const getCategories = () => {
        setCategories([]);
        const selected = selectedStorage.id;

        const unsub = onSnapshot(query(collection(db, 'storage', selected, 'category'), orderBy('timestamp', 'desc')), (snapshot) => {
            setCategories(snapshot.docs);
        });

        return unsub;
    }

    //open category
    const openCategory = (data) => {
        dispatch(setCategoryState({
            storage: selectedStorage,
            category: {
                id: data.id,
                name: data.name
            }
        }))

        navigation.navigate('CurrentStorageScreen')
    }

    useEffect(() => {
        getStorages();
    }, [])

    useEffect(() => {
        selectedStorage && getCategories();
    }, [selectedStorage])

  return (
    <Wrapper showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <StoragesContainer>
            <Text style={{color: '#24282C', fontWeight: 'bold', fontSize: 18}}>Noliktavas ({storagesInfo?.storages?.length})</Text>
            <AddButton onPress={() => setCreate(true)}><Text style={{color: '#24282C', fontSize: 18, fontWeight: 'bold'}}>+</Text></AddButton>
        </StoragesContainer>

        <View style={{width: '100%', height: 1, backgroundColor: '#6A6A6A', marginVertical: 15}} />

        {storagesInfo?.storages?.length > 0 && <>
            <DropDownHeading onPress={() => openStorages(!storagesMenu)}>
                <Text style={{color: '#24282C', fontWeight: 'bold', fontSize: 18}}>{selectedStorage?.name}</Text>
                {storagesMenu ? <Octicons name="triangle-down" size={24} color="black"/> : <Octicons name="triangle-up" size={24} color="black"/>}
            </DropDownHeading>

            {storagesMenu &&
            <DropDownContent>
                {storagesInfo?.storages.map(storage => {
                    return(
                        <DropDownItem key={storage.id} onPress={() => { setSelectedStorage(storage); openStorages(!storagesMenu);}}>
                            <Text>{storage.name}</Text>
                        </DropDownItem>
                    )
                })}
            </DropDownContent>
            }

            <AddStorageBtn onPress={() => setCategory(!category)} style={{marginTop: storagesMenu ? 30 : 0}}><Text style={{color: 'white', fontWeight: 'bold'}}>Pievienot</Text></AddStorageBtn>
 
            <StorageContainer>
                {categories?.length < 1 && <Text style={{textAlign: 'center', opacity: .5}}>Nav pievienotu kategoriju!</Text>}
                {categories?.map(category => (
                <StorageItem key={category?.data().id}>
                    <View>
                        <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10}}>
                            <Text style={{color: '#24282C', fontWeight: 'bold'}}>{category?.data().name}</Text>
                        </View>

                        <View style={{marginLeft: 10}}>
                            <Text style={{color: '#24282C', fontWeight: 'bold'}}>{category?.data().availableItems}/{category?.data().totalItems}</Text>
                        </View>
                    </View>

                    <ArrowRightCircle onPress={() => openCategory(category?.data())}>
                        <Feather name="arrow-right" size={24} color="black" />
                    </ArrowRightCircle>
                </StorageItem>
                ))}
            </StorageContainer>
        </>} 


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
                    <TextInput placeholder='Kategorijas nosaukums' onChangeText={setCategoryName} value={categoryName}/>
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