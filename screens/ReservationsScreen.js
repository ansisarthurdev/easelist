import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

//icons
import { Feather } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';

//components
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckItem from '../components/CheckItem'
import Loading from '../components/Loading'

//redux
import { useSelector, useDispatch } from 'react-redux'      
import { selectStorages, selectCategoryItemsReservation, setCategoryItemsReservation, selectUser, setReservation } from '../app/appSlice'

//firebase
import { onSnapshot, query, collection, orderBy, doc, updateDoc, increment, where, addDoc } from 'firebase/firestore'
import { db } from '../app/firebase'

const ReservationsScreen = () => {
  
  const navigation = useNavigation();
  const [active, setActive] = useState('reservations');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  //Reservation creation variables
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);  
  const [endDate, setEndDate] = useState(null);  
  const [pickerFor, setPickerFor] = useState(null);

  //redux
  const storages = useSelector(selectStorages);
  const reservation = useSelector(selectCategoryItemsReservation);

  const [storagesMenu, openStorages] = useState(false);
  const [selectedStorage, setSelectedStorage] = useState(storages?.storages[0]);
  const [categories, setCategories] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const openPicker = (picker) => {
    setOpen(!open);
    setPickerFor(picker);
  }

  const datePicker = (event, date) => {
    //console.log(event);

    if(event.type === 'dismissed'){
      setOpen(!open);
    } else if (event.type === 'set'){

      const newDate = {
        date: date.toDateString(),
        timestamp: event.nativeEvent.timestamp
      }

      if(pickerFor === 'startDate'){
        setStartDate(newDate);
        setPickerFor(null);
        setOpen(!open);
      } else if (pickerFor === 'endDate'){
        setEndDate(newDate);
        setPickerFor(null);
        setOpen(!open);
      }
    }
  }

  const getCategories = () => {
    setCategories([]);
    const selected = selectedStorage.id;

    const unsub = onSnapshot(query(collection(db, 'storage', selected, 'category'), orderBy('timestamp', 'desc')), (snapshot) => {
        setCategories(snapshot.docs);
    });

    return unsub;
  }

  const [choosedCategory, setChoosedCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);

  const getItems = () => {
    setCategoryItems([]);
    const selected = selectedStorage.id;
    let updatedCategories = [];

    const unsub = onSnapshot(query(collection(db, 'storage', selected, 'category', choosedCategory.id, 'items'), where('status', '==', 'Noliktavā')), (snapshot) => {
      snapshot.docs.map(doc => {
        let item = doc.data();

        item = {...item, status: {
          reservationName: name,
          startDate: startDate,
          endDate: endDate
        }};

        updatedCategories = [...updatedCategories, item];

        setCategoryItems(updatedCategories);
      })
    });

    return unsub;
  }

  const createReservation = async () => {
    if(reservation?.length > 0){
      console.log(reservation);
      setLoading(true);

        //create reservation
      for(let i=0; i < reservation?.length; i++){
        //in category take one item from available --check
        //change item status to --check
        const categoryRef = doc(db, 'storage', reservation[i]?.storageId, 'category', reservation[i]?.categoryId);
        
        await updateDoc(categoryRef, {
          availableItems: increment(-1)
        });

        const itemRef = doc(db, 'storage', reservation[i]?.storageId, 'category', reservation[i]?.categoryId, 'items', reservation[i]?.itemId);

        await updateDoc(itemRef, {
          status: 'Rezervēts',
          reservationName: reservation[i]?.status.reservationName,
        });
      }

      const docRef = await addDoc(collection(db, 'reservations'), {
        name: reservation[0].status.reservationName,
        startDate: reservation[0].status.startDate,
        endDate: reservation[0].status.endDate,
        reservation: JSON.stringify(reservation),
        addedBy: {displayName: user?.displayName}
      });

      updateDoc(doc(db, 'reservations', docRef.id), {
        id: docRef.id
      });

      //reset redux reservation
      dispatch(setCategoryItemsReservation([]));
      setActive('reservations');
      setName('');
      setStartDate(null);
      setEndDate(null);
      setPickerFor(null);
      setLoading(false);
    }
  }

  const getReservations = () => {
    const unsub = onSnapshot(query(collection(db, 'reservations')), (snapshot) => {
      setReservations(snapshot.docs)
    });

    return unsub;
  }

  useEffect(() => {
    getReservations();
  }, [])

  useEffect(() => {
    selectedStorage && getCategories();
  }, [selectedStorage])

  useEffect(() => {
    choosedCategory && getItems();
  }, [choosedCategory])

  return (
    <Wrapper>
      <Options>
        <Option onPress={() => setActive('reservations')}>
          <Text style={{color: 'white', fontSize: 16}}>Rezervācijas</Text>
          {active === 'reservations' && <Selector><Octicons name="triangle-up" size={32} color="#D9D9D9" /></Selector>}
        </Option>

        <Option onPress={() => setActive('create')}>
          <Text style={{color: 'white', fontSize: 16}}>Izveidot</Text>
          {active === 'create' && <Selector><Octicons name="triangle-up" size={32} color="#D9D9D9" /></Selector>}
        </Option>
      </Options>

      <Container showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      {active === 'reservations' && <>
        <ReservationsContainer>
          {reservations?.length === 0 && <Text style={{textAlign: 'center', opacity: .5}}>Nav atrasta neviena rezervācija.</Text>}
          {reservations?.length > 0 && <>
            {reservations.map(reservation => {

              const reservationItems = JSON.parse(reservation.data().reservation);

              return (
                <Reservation>
                <View>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10, alignItems: 'center'}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>{reservation.data().name}</Text>
                    </View>
 
                    <View style={{marginLeft: 10}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>{reservationItems?.length} mantas - no {reservation.data().startDate.date}</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>  
                      <Text>Pievienoja: {reservation?.data()?.addedBy.displayName}</Text>
                    </View>
                </View>

                <ArrowRightCircle onPress={() => {
                  navigation.navigate('ReservationScreen'); 
                  dispatch(setReservation(reservation.data())); 
                }}>
                    <Feather name="arrow-right" size={24} color="black" />
                </ArrowRightCircle>
                </Reservation>
              )
            })}
          </>}

          <View style={{width: '100%', height: 100}}></View>
        </ReservationsContainer>
      </>}

      {active === 'create' && <>
        {loading ? <Loading /> : <>
        <InputContainer>
          <TextInput placeholder='Vārds/vieta kam rezervēt' onChangeText={setName} value={name} />
        </InputContainer>

        <DateContainer>
          <View style={{width: '45%'}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10}}>No</Text>
            <DateInputContainer onPress={() => openPicker('startDate')}>
              <Text style={{opacity: startDate ? 1 : .5}}>{!startDate ? '--/--/--' : startDate?.date}</Text>
            </DateInputContainer>
          </View>

          <View style={{width: '45%'}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 10}}>Līdz</Text>
            <DateInputContainer onPress={() => openPicker('endDate')}>
              <Text style={{opacity: endDate ? 1 : .5}}>{!endDate ? '--/--/--' : endDate?.date}</Text>
            </DateInputContainer>
          </View>
        </DateContainer>

        <StorageContainer>
          <Text style={{fontWeight: 'bold', marginBottom: 10}}>Noliktavas</Text>

          {reservation.length > 0 && <Text style={{opacity: .5}}>Izvēlēts: {reservation?.length}</Text>}

          {storages?.storages?.length > 0 && <>
            <DropDownHeading onPress={() => openStorages(!storagesMenu)}>
              <Text style={{color: '#24282C', fontWeight: 'bold', fontSize: 18}}>{selectedStorage?.name}</Text>
              {storagesMenu ? <Octicons name="triangle-down" size={24} color="black"/> : <Octicons name="triangle-up" size={24} color="black"/>}
            </DropDownHeading>
          </>}

          {storagesMenu &&
            <DropDownContent>
              {storages?.storages?.map(storage => {
                return(
                    <DropDownItem key={storage.id} onPress={() => { setSelectedStorage(storage); openStorages(!storagesMenu);}}>
                        <Text>{storage.name}</Text>
                    </DropDownItem>
                )
              })}
            </DropDownContent>
          }

          <StorageContainer>
            {categories?.length < 1 && <Text style={{textAlign: 'center', opacity: .5}}>Nav izvēlēta noliktava.</Text>}
            {!choosedCategory && categories?.map(category => (
            <StorageItem key={category?.data().id} onPress={() => setChoosedCategory(category?.data())}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>{category?.data().name}</Text>
                    </View>

                    <View style={{position: 'relative', top: 6}}>
                        <Text style={{color: '#24282C', fontWeight: 'bold'}}>{category?.data().availableItems}/{category?.data().totalItems}</Text>
                    </View>
                </View>
            </StorageItem>
            ))}

            {choosedCategory && <>
            <StorageItemsContainer>
              <TouchableOpacity onPress={() => setChoosedCategory(null)} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}><AntDesign name="arrowleft" size={24} color="black" /><Text style={{marginLeft: 10, fontWeight: 'bold'}}>Atpakaļ</Text></TouchableOpacity> 
              
              {categoryItems?.length > 0 && <>
                {categoryItems.map(item => <CheckItem key={item?.id} item={item} />)}
              </>}
            </StorageItemsContainer>
            </>}

            <AddBtn onPress={() => createReservation()} style={{opacity: reservation?.length > 0 ? 1 : .5}}><Text style={{color: 'white', fontWeight: 'bold'}}>Izveidot rezervāciju</Text></AddBtn>
          </StorageContainer>

        </StorageContainer></>}
      </>}

        <View style={{width: '100%', height: 100}}/>
      </Container>

      {open && 
        <DateTimePicker 
          mode="date" 
          onChange={datePicker}
          value={new Date()}
          minimumDate={new Date()}
          positiveButtonLabel="Labi"
          negativeButtonLabel="Atcelt"
        />
      }
    </Wrapper>
  )
}

const AddBtn = styled.TouchableOpacity`
margin-top: 10px;
width: 100%;
background-color: #24282C;
padding: 15px;
flex-direction: row;
justify-content: center;
border-radius: 10px;
`

const StorageItemsContainer = styled.View``

const StorageItem = styled.TouchableOpacity`
background: white;
padding: 15px 25px 8px;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;
border-radius: 10px;
`

const DropDownItem = styled.TouchableOpacity`
padding: 15px;
margin-bottom: 10px;
background: white;
border-radius: 10px;
`

const DropDownContent = styled.View``

const DropDownHeading = styled.TouchableOpacity`
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 5px 15px 5px 0;
margin-bottom: 10px;
`


const StorageContainer = styled.View`
margin-top: 20px;
`

const DateContainer = styled.View`
margin-top: 20px;
flex-direction: row;
justify-content: space-between;
`

const DateInputContainer = styled.TouchableOpacity`
width: 100%;
background: #F7F6F0;
padding: 10px 15px;
border-radius: 10px;
`

const InputContainer = styled.View`
width: 100%;
background: #F7F6F0;
padding: 10px 15px;
border-radius: 10px;
`

const Avatar = styled.Image`
width: 30px;
height: 30px;
object-fit: cover;
border-radius: 180px;
margin: 0 10px 0 0;
`

const ArrowRightCircle = styled.TouchableOpacity`
background-color: #D3F36B;
height: 40px;
flex-direction: row;
align-items: center;
padding: 0 8px;
border-radius: 180px;
`

const Reservation = styled.View`
background: white;
padding: 15px 25px;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;
border-radius: 10px;
`

const ReservationsContainer = styled.ScrollView`

`

const Container = styled.ScrollView`
margin-top: 20px;
`

const Selector = styled.View`
position: absolute;
bottom: -14px;
width: 100%;
height: auto;
flex-direction: row;
justify-content: center;
`

const Option = styled.TouchableOpacity`
padding: 20px 0;
`

const Options = styled.View`
background-color: #24282C;
flex-direction: row;
justify-content: space-evenly;
border-radius: 10px;
`

const Wrapper = styled.View`
background-color: #D9D9D9;
display: flex;
height: 100%;
padding: 40px 5% 0;
`

export default ReservationsScreen