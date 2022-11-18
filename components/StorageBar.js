import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { View, Text, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/core'

//firebase
import { onSnapshot, collection, query, orderBy, serverTimestamp, addDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../app/firebase'

//icons
import { Feather, Octicons } from '@expo/vector-icons'

//components
import Modal from "react-native-modal";
import Loading from '../components/Loading'

//redux
import { useDispatch } from 'react-redux'
import { setCategoryState } from '../app/appSlice'



const StorageBar = ({storage}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const {id, name} = storage;
    const [categories, setCategories] = useState([]);
    const [categoryModal, setCategoryModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [showCategories, setShowCategories] = useState(false);
    const [alert, setAlert] = useState(null);
    const [creationStatus, setCreationStatus] = useState(false);

    const createCategory = async () => {
        //...create storage function
        if(categoryName?.length > 0){
            setCreationStatus(true);
            const docRef = await addDoc(collection(db, "storage", id, "category"), {
                name: categoryName,
                totalItems: 0,
                availableItems: 0,
                timestamp: serverTimestamp(),
            });
    
            await updateDoc(doc(db, 'storage', id, "category", docRef.id), {
                id: docRef.id
            })
    
            setCategoryModal(!categoryModal);
            setCategoryName('');
            setAlert(null);
            setCreationStatus(false);
        } else {
            setAlert('Lūdzu ievadi nosaukumu!')
        }
    }

    //open category
    const openCategory = (data) => {
        dispatch(setCategoryState({
            storage: storage,
            category: {
                id: data.id,
                name: data.name
            }
        }))

        navigation.navigate('CurrentStorageScreen')
    }

    useEffect(() => {
        // get categories
        setCategories([]);
        const unsub = onSnapshot(query(collection(db, 'storage', id, 'category'), orderBy('timestamp', 'desc')), (snapshot) => {
            setCategories(snapshot.docs);
        });

        return unsub;
    }, [])

  return (
    <Wrapper>
        <Storage>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5}}>
                <HeadingText>{name}</HeadingText>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CategoryCountText>{categories?.length}</CategoryCountText>
                    {showCategories ? <Octicons name="triangle-down" size={28} color="black" onPress={() => setShowCategories(!showCategories)}/> : <Octicons name="triangle-up" size={28} color="black" onPress={() => setShowCategories(!showCategories)}/>}
                </View>
            </View>

            {showCategories && <>
                <StorageItems>
                    <Divider />
                    {categories?.length < 1 && <AlertBox><Feather name="alert-circle" size={24} color="black" style={{marginRight: 10}}/><Text>Nav pievienotu kategoriju!</Text></AlertBox>}
                    {categories?.map(category => {
                        const {id, availableItems, name, totalItems} = category.data();

                        return (
                        <StorageItem key={id}>
                            <View>
                                <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10}}>
                                    <Text style={{color: '#24282C', fontWeight: 'bold'}}>{name}</Text>
                                </View>

                                <View style={{marginLeft: 10}}>
                                    <Text style={{color: '#24282C', fontWeight: 'bold'}}>{availableItems}/{totalItems}</Text>
                                </View>
                            </View>

                            <ArrowRightCircle onPress={() => openCategory(category?.data())}>
                                <Feather name="arrow-right" size={24} color="black" />
                            </ArrowRightCircle>
                        </StorageItem>
                        )
                    })}

                    <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
                        <AddStorageBtn onPress={() => setCategoryModal(!categoryModal)}><Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>+</Text></AddStorageBtn>
                    </View>
                </StorageItems>
            </>}
        </Storage>

        {/*Modal*/}

        {/* Storage category creation */}
        <Modal 
            isVisible={categoryModal}
            hasBackdrop={true}
            backdropOpacity={.2}
            style={{ margin: 0 }}
            swipeDirection="down"
            onSwipeComplete={() => setCategoryModal(false)}
            onBackdropPress={() => setCategoryModal(false)}
        >
            <ModalContainer>
                {creationStatus ? <Loading /> : <>                
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Pievienot kategoriju</Text>
                    <Text style={{color: 'gray', marginVertical: 10}}>Noliktavā ar nosaukumu {name}</Text>
                    {alert && <AlertContainer><AlertText>{alert}</AlertText></AlertContainer>}
                    
                    <InputContainer>
                        <TextInput placeholder='Kategorijas nosaukums' onChangeText={setCategoryName} value={categoryName}/>
                    </InputContainer>
                    
                    <ModalButton onPress={createCategory}><Text style={{color: 'white', fontWeight: 'bold'}}>Pievienot</Text></ModalButton>
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

const ModalButton = styled.TouchableOpacity`
background-color: #24282C;
padding: 15px 20px;
border-radius: 10px;
align-items: center;
margin: 20px 0 10px 0;
`

const InputContainer = styled.View`
width: 100%;
background: #6a6a6a50;
padding: 10px 15px;
border-radius: 10px;
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

const AddStorageBtn = styled.TouchableOpacity`
width: 40px;
height: 40px;
background-color: #24282C;
flex-direction: row;
align-items: center;
justify-content: center;
border-radius: 180px;
`

const CategoryCountText = styled.Text`
color: gray;
font-weight: bold;
font-size: 16px;
margin: 0 10px 0 0;
`

const AlertBox = styled.View`
background: #FFC001;
padding: 10px;
border-radius: 10px;
flex-direction: row;
align-items: center;
margin: 0 0 30px 0;
`

const Divider = styled.View`
width: 100%;
height: 1px;
background: #6A6A6A;
margin: 10px 0 15px;
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
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
`

const StorageItems = styled.View``

const HeadingText = styled.Text`
font-weight: bold;
font-size: 16px;
`

const Storage = styled.View`
background: white;
padding: 15px 25px 10px;
justify-content: center;
margin-bottom: 10px;
border-radius: 10px;
`

const Wrapper = styled.View``

export default StorageBar