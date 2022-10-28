import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { View, Text } from 'react-native';

//components
import Checkbox from 'expo-checkbox';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryItemsReservation, selectCategoryItemsReservation} from '../app/appSlice';

const CheckItem = ({item}) => {

  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const reservation = useSelector(selectCategoryItemsReservation);

  const checkItem = () => {
    setChecked(!checked);

    if(checked) {
      let filteredList = reservation.filter(obj => obj.name !== item.name);
      dispatch(setCategoryItemsReservation(filteredList));
    } else if(!checked) {
      let updatedList = [item, ...reservation];
      console.log(updatedList);
      dispatch(setCategoryItemsReservation(updatedList));
    }
  }

  useEffect(() => {
    const isItemChecked = reservation.filter(obj => obj.name === item.name);
    if(isItemChecked?.length > 0){
      setChecked(true);
    }
  }, [])

  return (
    <StorageItem key={item?.id}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        <View style={{backgroundColor: '#F7F6F0', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 10, borderRadius: 10}}>
          <Text style={{color: '#24282C', fontWeight: 'bold'}}>{item?.name}</Text>
        </View>

        <View style={{position: 'relative', top: 6}}>
          <Checkbox
            value={checked}
            color={checked ? '#D3F36B' : '#24282C'}
            onValueChange={checkItem}
          />
        </View>
      </View>
    </StorageItem>
  )
}

const StorageItem = styled.View`
background: white;
padding: 15px 25px 8px;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: 10px;
border-radius: 10px;
`

export default CheckItem