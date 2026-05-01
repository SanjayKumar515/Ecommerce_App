import React, { useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MyBackButton } from '../../../components';
import styles from './styles';

const addresses = [
  {
    id: '1',
    name: 'Sanjay Kumar',
    type: 'Home',
    address: '123, Main Street, Sector 5',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    phone: '9876543210',
    selected: true,
  },
  {
    id: '2',
    name: 'Sanjay Kumar',
    type: 'Work',
    address: 'Office No. 404, IT Park, Block B',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    phone: '9876543210',
    selected: false,
  },
];

const AddressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [ selectedId, setSelectedId ] = React.useState( '1' );
  const [ selectedCoords, setSelectedCoords ] = React.useState<any>( null );
  const [ selectedAddress, setSelectedAddress ] = React.useState<string>( '' );

  useEffect( () => {
    //@ts-ignore
    if ( route.params?.coordinates ) {
      //@ts-ignore
      setSelectedCoords( route.params.coordinates );
      //@ts-ignore
      setSelectedAddress( route.params.address || '' );
    }
    //@ts-ignore
  }, [ route.params?.coordinates, route.params?.address ] );

  return (
    <View style={ styles.container }>
      <MyBackButton title='Select Delivery Address' />

      <ScrollView style={ styles.content }>
        <View style={ styles.addressActions }>
          <Pressable style={ [ styles.addBtn, { flex: 1, marginRight: 8 } ] }>
            <Text style={ styles.addBtnText }>+ Add New</Text>
          </Pressable>
          <Pressable
            style={ [ styles.addBtn, { flex: 1 } ] }
            onPress={ () => navigation.navigate( 'LocationPicker' as never ) }
          >
            <Text style={ [ styles.addBtnText, { color: '#388E3C' } ] }>📍 Use Map</Text>
          </Pressable>
        </View>

        { selectedCoords && (
          <View style={ styles.coordsDisplay }>
            <Text style={ styles.coordsTitle }>Pinned Location:</Text>
            <Text style={ styles.coordsValue }>{ selectedAddress || `${selectedCoords.latitude.toFixed( 4 )}, ${selectedCoords.longitude.toFixed( 4 )}` }</Text>
          </View>
        ) }

        <Text style={ styles.sectionTitle }>{ addresses.length } SAVED ADDRESSES</Text>

        { addresses.map( ( item ) => (
          <Pressable
            key={ item.id }
            style={ [ styles.addressCard, selectedId === item.id && styles.selectedCard ] }
            onPress={ () => setSelectedId( item.id ) }
          >
            <View style={ styles.radioRow }>
              <View style={ [ styles.radio, selectedId === item.id && styles.radioActive ] }>
                { selectedId === item.id && <View style={ styles.radioInner } /> }
              </View>
              <View style={ styles.headerRow }>
                <Text style={ styles.name }>{ item.name }</Text>
                <View style={ styles.typeTag }>
                  <Text style={ styles.typeText }>{ item.type }</Text>
                </View>
                <Text style={ styles.phone }>{ item.phone }</Text>
              </View>
            </View>

            <Text style={ styles.addressText }>
              { item.address }, { item.city }, { item.state } - { item.pincode }
            </Text>

            { selectedId === item.id && (
              <Pressable
                style={ styles.deliverBtn }
                onPress={ () => navigation.navigate( 'Payment' as never ) }
              >
                <Text style={ styles.deliverText }>DELIVER HERE</Text>
              </Pressable>
            ) }
          </Pressable>
        ) ) }
      </ScrollView>
    </View>
  );
};



export default AddressScreen;
