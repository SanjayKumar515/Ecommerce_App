import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { MyBackButton } from '../../../components';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
import styles from './styles';

const LocationPickerScreen = () => {
  const navigation = useNavigation();
  const [ region, setRegion ] = useState( {
    latitude: 28.6139,
    longitude: 77.2090,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  } );

  const [ markerPosition, setMarkerPosition ] = useState( {
    latitude: 28.6139,
    longitude: 77.2090,
  } );

  const [ address, setAddress ] = useState( 'Fetching address...' );

  useEffect( () => {
    handleLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  const getAddressFromCoords = async ( lat: number, lng: number ) => {
    try {
      const apiKey = 'AIzaSyAPgIx_sdOWXxskpDi-kK2dGYf1yo7cTj8';
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();
      if ( data.results && data.results.length > 0 ) {
        setAddress( data.results[ 0 ].formatted_address );
      } else {
        setAddress( 'Address not found' );
      }
    } catch ( error ) {
      console.log( 'Geocoding error:', error );
      setAddress( 'Error fetching address' );
    }
  };

  const handleLocationPermission = async () => {
    const permission = Platform.OS === 'android' 
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION 
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const result = await request(permission);
    
    if (result === RESULTS.GRANTED) {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    setTimeout(() => {
      Geolocation.getCurrentPosition(
        ( position ) => {
          const { latitude, longitude } = position.coords;
          const newRegion = {
            ...region,
            latitude,
            longitude,
          };
          setRegion( newRegion );
          setMarkerPosition( { latitude, longitude } );
          getAddressFromCoords( latitude, longitude );
        },
        ( error ) => {
          console.log( error.code, error.message );
        },
        { 
          enableHighAccuracy: false, 
          timeout: 20000, 
          maximumAge: 10000,
          showLocationDialog: true,
          forceRequestLocation: true
        }
      );
    }, 1000);
  };

  const onConfirm = () => {
    // Navigate back with the coordinates and address
    // @ts-ignore
    navigation.navigate( 'Address', {
      coordinates: markerPosition,
      address: address
    } );
  };

  return (
    <View style={ styles.container }>
      <MyBackButton title="Pick Location" />

      <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.map }
        initialRegion={ region }
        onRegionChangeComplete={ ( newRegion ) => {
          setMarkerPosition( {
            latitude: newRegion.latitude,
            longitude: newRegion.longitude,
          } );
          getAddressFromCoords( newRegion.latitude, newRegion.longitude );
        } }
      >
        <Marker
          coordinate={ markerPosition }
          draggable
          onDragEnd={ ( e ) => setMarkerPosition( e.nativeEvent.coordinate ) }
        />
      </MapView>

      <View style={ styles.footer }>
        <View style={ styles.coordBox }>
          <Text style={ styles.coordLabel }>Latitude: { markerPosition.latitude.toFixed( 6 ) }</Text>
          <Text style={ styles.coordLabel }>Longitude: { markerPosition.longitude.toFixed( 6 ) }</Text>
        </View>
        <Pressable style={ styles.confirmBtn } onPress={ onConfirm }>
          <Text style={ styles.confirmText }>CONFIRM LOCATION</Text>
        </Pressable>
      </View>
    </View>
  );
};



export default LocationPickerScreen;
