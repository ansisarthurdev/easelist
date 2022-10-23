import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, Text, TextInput, NativeEventEmitter } from 'react-native'
import { useNavigation } from '@react-navigation/native'

//icons
import { Feather } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'

//components
import DateTimePicker from '@react-native-community/datetimepicker';

const ReservationsScreen = () => {
  
  const navigation = useNavigation();
  const [active, setActive] = useState('reservations');

  //Reservation creation variables
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);  
  const [endDate, setEndDate] = useState(null);  
  const [pickerFor, setPickerFor] = useState(null);

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

      <Container>
      {active === 'reservations' && <>
        <ReservationsContainer>
          <Reservation>
            <View>
                <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10, alignItems: 'center'}}>
                    <Text style={{color: '#24282C', fontWeight: 'bold'}}>Jānis Kalniņš</Text>
                </View>

                <View style={{marginLeft: 10}}>
                    <Text style={{color: '#24282C', fontWeight: 'bold'}}>10 mantas - no 10.10.2022</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10}}>
                    <Avatar source={{uri: 'https://lh3.googleusercontent.com/a/ALm5wu2I4LRRStJa7Q-Walr64YnnzPdsJOHzbQLG4B2uZQ=s83-c-mo'}}/>
                    <Text>ansisarthurdev</Text>
                </View>
            </View>

            <ArrowRightCircle onPress={() => navigation.navigate('ReservationScreen')}>
                <Feather name="arrow-right" size={24} color="black" />
            </ArrowRightCircle>
          </Reservation>

          <Reservation>
            <View>
                <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10, alignItems: 'center'}}>
                    <Text style={{color: '#24282C', fontWeight: 'bold'}}>Jānis Kalniņš</Text>
                </View>

                <View style={{marginLeft: 10}}>
                    <Text style={{color: '#24282C', fontWeight: 'bold'}}>10 mantas - no 10.10.2022</Text>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10}}>
                    <Avatar source={{uri: 'https://lh3.googleusercontent.com/a/ALm5wu2I4LRRStJa7Q-Walr64YnnzPdsJOHzbQLG4B2uZQ=s83-c-mo'}}/>
                    <Text>ansisarthurdev</Text>
                </View>
            </View>

            <ArrowRightCircle onPress={() => navigation.navigate('CurrentActiveReservationScreen')}>
                <Feather name="arrow-right" size={24} color="black" />
            </ArrowRightCircle>
          </Reservation>

            <View style={{width: '100%', height: 100}}></View>
        </ReservationsContainer>
      </>}

      {active === 'create' && <>
        <InputContainer>
          <TextInput placeholder='Vārds/vieta kam rezervēt' onChangeText={setName} value={name}/>
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
      </>}
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

const Container = styled.View`
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