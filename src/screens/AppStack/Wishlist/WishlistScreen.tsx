import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { removeFromWishlist } from '../../../redux/features/WishlistSlice';
import { addToCart } from '../../../redux/features/CartSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { MyBackButton } from '../../../components';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './styles';

const WishlistScreen = () => {
  const dispatch = useDispatch();
  const { wishlistData } = useSelector((state: RootState) => state.wishlist);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          {item.rating && (
            <View style={styles.ratingBox}>
              <Text style={styles.ratingText}>{item.rating} ★</Text>
            </View>
          )}
        </View>

        <View style={styles.actionRow}>
          <Pressable
            style={styles.cartBtn}
            onPress={() => dispatch(addToCart({ ...item, quantity: 1 }))}
          >
            <Icon name="cart-outline" size={RFValue(16)} color="#2874F0" />
            <Text style={styles.cartBtnText}>Add to Cart</Text>
          </Pressable>
          <Pressable
            style={styles.removeBtn}
            onPress={() => dispatch(removeFromWishlist(item.id))}
          >
            <Icon name="trash-outline" size={RFValue(18)} color="#666" />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MyBackButton title={`My Wishlist (${wishlistData.length})`} />

      {wishlistData.length > 0 ? (
        <FlatList
          data={wishlistData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: wp(3) }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="heart-dislike-outline" size={RFValue(60)} color="#ccc" />
          <Text style={styles.emptyTitle}>Your wishlist is empty!</Text>
          <Text style={styles.emptySub}>
            Save items that you like in your wishlist.
          </Text>
        </View>
      )}
    </View>
  );
};

export default WishlistScreen;
