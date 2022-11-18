import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { View, Text, TouchableOpacity, TextInput, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/core'

//icons
import { MaterialIcons } from '@expo/vector-icons';

//components
import Modal from "react-native-modal";
import StorageItemBar from '../components/StorageItemBar';

//redux
import { selectCategory } from '../app/appSlice';
import { useSelector } from 'react-redux';

//firebase
import { onSnapshot, doc, addDoc, collection, updateDoc, increment, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../app/firebase';

const CurrentStorageScreen = () => {

  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState(1);
  const [description, setDescription] = useState('');

  const category = useSelector(selectCategory);
  const [categoryData, setCategoryData] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);

  //if item is special toggle button
  const [isSpecial, setIsSpecial] = useState(false);
  const toggleSwitch = () => {
    setIsSpecial(previousState => !previousState);
  }

  const getCategoryData = () => {
    const unsub = onSnapshot(doc(db, "storage", category?.storage?.id, 'category', category?.category?.id), (doc) => {
      setCategoryData(doc.data())
    });

    return unsub;
  }

  const getCategoryItems = () => {
    setCategoryItems([]);
    const unsub = onSnapshot(query(collection(db, 'storage', category?.storage?.id, 'category', category?.category.id, 'items'), orderBy('timestamp', 'desc')), (snapshot) => {
      setCategoryItems(snapshot.docs);
    });

    return unsub;
  }

  const createCategoryItem = async () => {
    //...create category item function

      //if adding only one item
      if(name !== '' && number === '1' && !isSpecial){
        let number = categoryItems?.length + 1;
        const docRef = await addDoc(collection(db, "storage", category?.storage.id, 'category', category?.category.id, 'items'), {
          name: `${name + number} ${category?.category?.name}`,
          status: 'Noliktavā',
          timestamp: serverTimestamp(),
          storageId: category?.storage.id,
          categoryId: category?.category.id,
          description: description,
          priority: 'Standart'
        });
        
        updateDoc(doc(db, "storage", category?.storage.id, 'category', category?.category.id, 'items', docRef.id), {
          itemId: docRef.id
        });

        updateDoc(doc(db, 'storage', category?.storage.id, 'category', category?.category.id), {
          availableItems: increment(1),
          totalItems: increment(1)
        })
      }

      //if adding multiple items
      if(name !== '' && number > '1' && !isSpecial){
        let itemNumber = categoryItems.length + 1;

        for(let i=0; i < number; i++){
          const docRef = await addDoc(collection(db, "storage", category?.storage.id, 'category', category?.category.id, 'items'), {
            name: `${name + itemNumber} ${category?.category?.name}`,
            status: 'Noliktavā',
            timestamp: serverTimestamp(),
            storageId: category?.storage.id,
            categoryId: category?.category.id,
            description: description,
            priority: 'Standart'
          });

          updateDoc(doc(db, "storage", category?.storage.id, 'category', category?.category.id, 'items', docRef.id), {
            itemId: docRef.id
          });

          itemNumber = itemNumber + 1;
        }

        updateDoc(doc(db, 'storage', category?.storage.id, 'category', category?.category.id), {
          availableItems: increment(number),
          totalItems: increment(number)
        })
      }

      if(name !== '' && isSpecial){
        const docRef = await addDoc(collection(db, "storage", category?.storage.id, 'category', category?.category.id, 'items'), {
          name: `${name} ${category?.category?.name}`,
          status: 'Noliktavā',
          timestamp: serverTimestamp(),
          storageId: category?.storage.id,
          categoryId: category?.category.id,
          description: description,
          priority: 'Special'
        });

        updateDoc(doc(db, "storage", category?.storage.id, 'category', category?.category.id, 'items', docRef.id), {
          itemId: docRef.id
        });

        updateDoc(doc(db, 'storage', category?.storage.id, 'category', category?.category.id), {
          availableItems: increment(number),
          totalItems: increment(number)
        })
      }

    setModal(!modal);
    setName('');
    setNumber(1);
    setIsSpecial(false);
    setDescription('');
  }

  const colors = [{
    id: 1, color: '#aa66cc', description: 'Īpašs, pieejams',
  }, {
    id: 2, color: '#00C851', description: 'Standarta, pieejams',
  }, {
    id: 3, color: '#ffbb33', description: 'Rezervēts',
  }, {
    id: 4, color: '#ff4444', description: 'Lietošanā',
  }, {
    id: 5, color: '#33b5e5', description: 'Mazgāšanā'
  }]

  useEffect(() => {
    if(category){
      getCategoryData();
      getCategoryItems();
    }
  }, [category])

  return (
    <Wrapper>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30}} onPress={() => navigation.navigate('StorageScreen')}>
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Atpakaļ</Text>
        </TouchableOpacity>

        <ItemInfoContainer showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <Heading>
            <Text style={{fontWeight: 'bold', fontSize: 22}}>{category?.storage.name}</Text>
            <AddButton onPress={() => setModal(true)}><Text style={{color: '#24282C', fontSize: 18, fontWeight: 'bold'}}>+</Text></AddButton>
          </Heading>

          <Text style={{marginBottom: 10}}>Krāsu apraksts</Text>
          <ColorDescription>
            {colors?.map(item => {
              const {id, color, description} = item;
              
              return (
                <View key={id} style={{flexDirection: 'row', marginRight: 10, alignItems: 'center'}}>
                  <View style={{width: 15, height: 15, backgroundColor: color, borderRadius: 180, marginRight: 5}}/>
                  <Text>{description}</Text>
                </View>
              )
            })}
          </ColorDescription>

          <ItemInfo>
            <View style={{flexDirection: 'row', backgroundColor: '#F7F6F0', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10}}>
              <Text style={{fontSize: 18, marginRight: 20}}>{category?.category?.name}</Text>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>{categoryData?.availableItems}/{categoryData?.totalItems}</Text>
            </View>

            <Text style={{fontWeight: 'bold', fontSize: 18, paddingRight: 15}}>Statuss</Text>
          </ItemInfo>

          <Items>
            {categoryItems?.length === 0 && <Text style={{textAlign: 'center', opacity: .5}}>Izskatās, ka nav pievienots neviens objekts!</Text>}
            {categoryItems?.length > 0 && <>
              {categoryItems.map(item => (
                <StorageItemBar 
                  item={item.data()}
                  key={item.data().id}
                />
              ))}
            </>}

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
                <ModalItem style={{width: isSpecial ? '100%' : '70%'}}>
                  <View>
                    <ModalItemHeading>Apzīmējums</ModalItemHeading>
                    {isSpecial && <ModalItemHeading style={{opacity: .7}}>Nepieciešams pievienot arī kārtas numuru! Piemēram: W -> W10</ModalItemHeading>}
                  </View>
                  <InputContainer>
                    <TextInput cursorColor='#24282C' placeholder='Apzīmējums' onChangeText={setName} value={name}/>
                  </InputContainer>
                </ModalItem>

                {!isSpecial && <ModalItem style={{width: '20%'}}>
                  <ModalItemHeading>Skaits</ModalItemHeading>
                  <InputContainer>
                    <TextInput cursorColor='#24282C' placeholder='0' keyboardType='number-pad' onChangeText={setNumber} value={number} />
                  </InputContainer>
                </ModalItem>}
              </ModalItems>


              <ModalItems style={{marginTop: 15}}>
                <ModalItem style={{width: '70%'}}>
                  <ModalItemHeading>Apraksts</ModalItemHeading>
                  <ModalItemDescription>*nav obligāts</ModalItemDescription>
                  <InputContainer>
                    <TextInput cursorColor='#24282C' placeholder='Apraksts' multiline={true} onChangeText={setDescription} value={description}/>
                  </InputContainer>
                </ModalItem>

                <ModalItem style={{width: '20%'}}>
                  <ModalItemHeading>Prioritāte</ModalItemHeading>
                  <ModalItemDescription>*tiks iekrāsots</ModalItemDescription>
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Switch
                      trackColor={{ false: '#767577', true: '#D3F36B' }}
                      thumbColor={isSpecial ? '#767577' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isSpecial}
                    />
                  </View>
                </ModalItem>
              </ModalItems>

              <ModalButton onPress={() => createCategoryItem()}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Pievienot</Text>
              </ModalButton>
          </ModalContainer>
        </Modal>

    </Wrapper>
  )
}

const ColorDescription = styled.View`
flex-direction: row;
flex-wrap: wrap;
`

const ModalItemDescription = styled.Text`
opacity: .5;
font-size: 12px;
`

const InputContainer = styled.View`
width: 100%;
background: #6A6A6A50;
padding: 5px 10px;
border-radius: 10px;
margin-top: 10px;
`

const ModalItemHeading = styled.Text`
font-weight: bold;
font-size: 16px;
`

const ModalItems = styled.View`
flex-direction: row;
justify-content: space-between;
`

const ModalItem = styled.View``

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
margin-bottom: 10px;
`

const ItemInfoContainer = styled.ScrollView``

const Wrapper = styled.View`
background-color: #D9D9D9;
display: flex;
height: 100%;
padding: 50px 5% 0;
`

export default CurrentStorageScreen