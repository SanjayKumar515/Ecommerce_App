import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CustomButton, MyBackButton } from '../../../components/index';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../redux/features/CartSlice';
import { AppDispatch, RootState } from '../../../redux/store';

const SingleProduct = () => {
  // states
  const [ currentItem, setCurrentItem ] = useState<any>( {} );
  // hooks
  const {
    params: { Product },
  } = useRoute<any>();
  const { navigate } = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { cartData, totalAmount } = useSelector( ( state: RootState ) => state.cartItems );

  // life cycle
  useEffect( () => {
    const itemChecking = () => {
      const itemAvailable = cartData?.find( ( value: any ) => value.id === Product.id );
      if ( itemAvailable ) {
        setCurrentItem( itemAvailable );
      } else {
        setCurrentItem( {} );
      }
    };
    itemChecking();
  }, [ cartData ] );

  return (
    <ScrollView style={ styles.container } showsVerticalScrollIndicator={ false }>

      <MyBackButton />
      {/* Card */ }
      <View style={ styles.cardBox }>
        <Image source={ { uri: Product.thumbnail } } style={ styles.img } />
        <View style={ styles.textBox }>
          <Text style={ styles.title }>{ Product.title }</Text>
          <Text style={ styles.price }>${ Product.price }</Text>
        </View>
        {/* body */ }
        <View style={ styles.body }>
          <Text style={ styles.label }>
            Category: <Text style={ styles.value }>{ Product.category }</Text>
          </Text>
          <Text style={ styles.label }>
            Brand: <Text style={ styles.value }>{ Product.brand }</Text>
          </Text>
          <Text style={ styles.label }>
            Description: <Text style={ styles.value }>{ Product.description }</Text>
          </Text>
          <Text style={ styles.label }>
            Rating: <Text style={ styles.value }>{ Product.rating }⭐️</Text>
          </Text>
          <Text style={ styles.label }>
            Stock: <Text style={ styles.value }>{ Product.stock }</Text>
          </Text>
        </View>
        <View style={ styles.footer }>
          { currentItem?.quantity > 0 ? (
            <View style={ styles.twoBtn }>
              <Pressable style={ styles.btnBox } onPress={ () => dispatch( removeFromCart( Product.id ) ) }>
                <Text style={ styles.btn }>-</Text>
              </Pressable>
              <Pressable>
                <Text style={ styles.btn }>{ currentItem.quantity }</Text>
              </Pressable>
              <Pressable
                style={ styles.btnBox }
                onPress={ () => dispatch( addToCart( Product ) ) }>
                <Text style={ styles.btn }>+</Text>
              </Pressable>
            </View>
          ) : (
            <CustomButton onPress={ () => dispatch( addToCart( Product ) ) } title="Add to Cart" />
          ) }
          <CustomButton onPress={ () => navigate( 'Cart' as never ) } title="View Cart" />
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleProduct;
