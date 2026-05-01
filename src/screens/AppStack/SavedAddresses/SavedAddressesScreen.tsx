import React from 'react';
import { View, Text, FlatList, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MyBackButton } from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import styles from './styles';

const initialAddresses = [
  {
    id: '1',
    name: 'Sanjay Kumar',
    type: 'Home',
    address: '123, Main Street, Sector 5',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    phone: '9876543210',
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
  },
];

const SavedAddressesScreen = () => {
  const navigation = useNavigation();
  const [ addresses, setAddresses ] = React.useState( initialAddresses );

  const handleDelete = ( id: string ) => {
    Alert.alert( 'Delete Address', 'Are you sure you want to delete this address?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setAddresses( addresses.filter( a => a.id !== id ) )
      },
    ] );
  };

  const renderItem = ( { item }: { item: any } ) => (
    <View style={ styles.card }>
      <View style={ styles.header }>
        <View style={ styles.typeContainer }>
          <Text style={ styles.typeText }>{ item.type }</Text>
        </View>
        <Pressable onPress={ () => handleDelete( item.id ) }>
          <Icon name="trash-outline" size={ RFValue( 18 ) } color="#666" />
        </Pressable>
      </View>

      <Text style={ styles.name }>{ item.name }</Text>
      <Text style={ styles.addressText }>
        { item.address }, { item.city }, { item.state } - { item.pincode }
      </Text>
      <Text style={ styles.phoneText }>{ item.phone }</Text>

      <View style={ styles.footer }>
        <Pressable style={ styles.editBtn }>
          <Text style={ styles.editText }>Edit</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={ styles.container }>
      <MyBackButton title="My Saved Addresses" />

      <Pressable
        style={ styles.addBtn }
        onPress={ () => navigation.navigate( 'LocationPicker' as never ) }
      >
        <Icon name="add" size={ 24 } color="#2874F0" />
        <Text style={ styles.addText }>Add a new address</Text>
      </Pressable>

      <FlatList
        data={ addresses }
        keyExtractor={ item => item.id }
        renderItem={ renderItem }
        contentContainerStyle={ styles.list }
        ListEmptyComponent={
          <View style={ styles.empty }>
            <Text>No saved addresses found.</Text>
          </View>
        }
      />
    </View>
  );
};



export default SavedAddressesScreen;
