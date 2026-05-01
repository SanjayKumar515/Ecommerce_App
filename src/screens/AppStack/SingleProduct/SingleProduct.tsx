import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  CustomButton,
  MyBackButton,
  Skeleton,
} from '../../../components/index';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../redux/features/CartSlice';
import { toggleWishlist } from '../../../redux/features/WishlistSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

const SingleProduct = () => {
  // states
  const [ currentItem, setCurrentItem ] = useState<any>( {} );
  const [ imageLoading, setImageLoading ] = useState( true );

  // hooks
  const {
    params: { Product },
  } = useRoute<any>();
  const { navigate } = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { cartData } = useSelector( ( state: RootState ) => state.cartItems );
  const { wishlistData } = useSelector( ( state: RootState ) => state.wishlist );
  const isWishlisted = wishlistData.some( item => item.id === Product.id );

  // life cycle
  useEffect( () => {
    const itemChecking = () => {
      const itemAvailable = cartData?.find(
        ( value: any ) => value.id === Product.id,
      );
      if ( itemAvailable ) {
        setCurrentItem( itemAvailable );
      } else {
        setCurrentItem( {} );
      }
    };
    itemChecking();
  }, [ cartData, Product.id ] );


  const fieldsData = [
    { label: 'Category', value: Product?.category },
    { label: 'Brand', value: Product?.brand },
    { label: 'Description', value: Product?.description },
    { label: 'Rating', value: `${ Product?.rating } ⭐️` },
    { label: 'Stock', value: Product?.stock },
  ];

  return (
    <ScrollView style={ styles.container } showsVerticalScrollIndicator={ false }>
      <MyBackButton title='Product Details' />
      {/* Card */ }
      <View style={ styles.cardBox }>
        <Pressable
          style={ styles.wishListBtn }
          onPress={ () => dispatch( toggleWishlist( Product ) ) }
        >
          <Icon
            name={ isWishlisted ? 'heart' : 'heart-outline' }
            size={ RFValue( 24 ) }
            color={ isWishlisted ? '#E53935' : '#666' }
          />
        </Pressable>
        { imageLoading && (
          <Skeleton
            width={ wp( 90 ) }
            height={ hp( 30 ) }
            borderRadius={ wp( 4 ) }
            style={ { alignSelf: 'center' } }
          />
        ) }
        <View style={ styles.imageBox }>
          <Image
            source={ { uri: Product.thumbnail } }
            style={ [ styles.img, imageLoading && { width: 0, height: 0 } ] }
            onLoad={ () => setImageLoading( false ) }
          />

          { Product.rating && (
            <View
              style={ styles.productRatingContainer }
            >
              <Text
                style={ styles.starRatingText }
              >
                { Product.rating } ★
              </Text>
            </View>
          ) }
        </View>

        <View style={ styles.textBox }>
          <Text style={ styles.title }>{ Product.title }</Text>
          <Text style={ styles.price }>${ Product.price }</Text>
        </View>
        {/* body */ }
        <View style={ styles.body }>
          { fieldsData.map( ( item, index ) => (
            <Text key={ index } style={ styles.label }>
              { item.label }: <Text style={ styles.value }>{ item.value }</Text>
            </Text>
          ) ) }
        </View>

        <View style={ styles.footer }>
          { currentItem?.quantity > 0 ? (
            <View style={ styles.twoBtn }>
              <Pressable
                style={ styles.btnBox }
                onPress={ () => dispatch( removeFromCart( Product.id ) ) }
              >
                <Text style={ styles.btn }>-</Text>
              </Pressable>
              <Pressable>
                <Text style={ styles.btn }>{ currentItem.quantity }</Text>
              </Pressable>
              <Pressable
                style={ styles.btnBox }
                onPress={ () => dispatch( addToCart( Product ) ) }
              >
                <Text style={ styles.btn }>+</Text>
              </Pressable>
            </View>
          ) : (
            <CustomButton
              onPress={ () => dispatch( addToCart( Product ) ) }
              title="Add to Cart"
            />
          ) }
          <CustomButton
            onPress={ () => navigate( 'Cart' as never ) }
            title="View Cart"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleProduct;
