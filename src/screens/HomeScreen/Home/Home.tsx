import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../redux/features/ProductsSlice';
import { AppDispatch, RootState } from '../../../redux/store';

const Home = () => {
  // hooks
  const { navigate } = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { products, isSuccess } = useSelector( ( state: RootState ) => state.products );
  console.log( '🚀 ~ file: Home.js:12 ~ Home ~ products:', products );

  useEffect( () => {
    dispatch( getAllProducts() );
  }, [] );

  return (
    <View style={ styles.container }>
      <FlatList
        data={ products?.products || [] } renderItem={ ( { item } ) => {
          return (
            <TouchableOpacity
              // @ts-ignore
              onPress={ () => navigate( 'SingleProduct' as never, { Product: item } as never ) }
              style={ styles.cardBox }
              key={ item.id }>
              <Image source={ { uri: item.thumbnail } } style={ styles.img } />
              <View style={ styles.footer }>
                <Text style={ styles.title }>{ item.title }</Text>
                <Text style={ styles.price }>${ item.price }</Text>
              </View>
            </TouchableOpacity  >
          );
        } }
      />
    </View>
  );
};

export default Home;
