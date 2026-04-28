import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MyBackButton, CustomButton } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  clearCart,
  removeFromCart,
} from '../../../redux/features/CartSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '../../../constant';

const CartScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { navigate } = useNavigation();
  const { cartData, totalAmount } = useSelector(
    (state: RootState) => state.cartItems,
  );
  const theme = useTheme();

  const handleCheckout = () => {
    dispatch(clearCart());
    Alert.alert('Order Success', 'Your order placed successfully!', [
      { text: 'OK', onPress: () => navigate('root' as never) },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.cardTop}>
        <Image source={{ uri: item.thumbnail }} style={styles.productImg} />
        <View style={styles.productDetails}>
          <Text
            style={[styles.productTitle, { color: theme.colors.onSurface }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            style={[styles.productPrice, { color: theme.colors.onSurface }]}
          >
            ₹{item.price}
          </Text>
          <Text style={styles.deliveryText}>Delivery in 2-3 days</Text>
        </View>
      </View>

      <View style={styles.cardBottom}>
        <View style={styles.qtyContainer}>
          <Pressable
            style={[styles.qtyBtn, { borderColor: theme.colors.outline }]}
            onPress={() => dispatch(removeFromCart(item.id))}
          >
            <Text
              style={{ fontSize: RFValue(18), color: theme.colors.onSurface }}
            >
              -
            </Text>
          </Pressable>
          <View style={styles.qtyCount}>
            <Text
              style={{
                fontFamily: Fonts.Medium,
                color: theme.colors.onSurface,
              }}
            >
              {item.quantity}
            </Text>
          </View>
          <Pressable
            style={[styles.qtyBtn, { borderColor: theme.colors.outline }]}
            onPress={() => dispatch(addToCart(item))}
          >
            <Text
              style={{ fontSize: RFValue(16), color: theme.colors.onSurface }}
            >
              +
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.removeBtn}
          onPress={() => dispatch(removeFromCart(item.id))}
        >
          <Text style={[styles.removeText, { color: theme.colors.error }]}>
            REMOVE
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {/* Header with Back Button */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <MyBackButton />
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
          My Cart
        </Text>
      </View>

      {cartData.length > 0 ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {/* Delivery Address Section */}
            <View
              style={[
                styles.addressSection,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.deliverTo,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  Deliver to:{' '}
                  <Text
                    style={{
                      fontFamily: Fonts.Bold,
                      color: theme.colors.onSurface,
                    }}
                  >
                    Sanjay Kumar, 800001
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.addressSub,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  Patna, Bihar, India
                </Text>
              </View>
              <Pressable
                style={[
                  styles.changeBtn,
                  { borderColor: theme.colors.primary },
                ]}
              >
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontFamily: Fonts.Bold,
                  }}
                >
                  Change
                </Text>
              </Pressable>
            </View>

            {/* Cart Items */}
            <View style={{ paddingVertical: hp(1) }}>
              {cartData.map((item: any) => (
                <View key={item.id}>{renderItem({ item })}</View>
              ))}
            </View>

            {/* Price Details */}
            <View
              style={[
                styles.priceDetailsSection,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <Text
                style={[
                  styles.priceDetailsTitle,
                  { color: theme.colors.onSurface },
                ]}
              >
                Price Details
              </Text>
              <View style={styles.priceRow}>
                <Text style={{ color: theme.colors.onSurfaceVariant }}>
                  Price ({cartData.length} items)
                </Text>
                <Text style={{ color: theme.colors.onSurface }}>
                  ₹{totalAmount}
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={{ color: theme.colors.onSurfaceVariant }}>
                  Delivery Charges
                </Text>
                <Text style={{ color: '#388E3C', fontFamily: Fonts.Bold }}>
                  FREE
                </Text>
              </View>
              <View
                style={[
                  styles.divider,
                  { backgroundColor: theme.colors.outlineVariant },
                ]}
              />
              <View style={styles.priceRow}>
                <Text
                  style={[
                    styles.totalAmountTitle,
                    { color: theme.colors.onSurface },
                  ]}
                >
                  Total Amount
                </Text>
                <Text
                  style={[
                    styles.totalAmountTitle,
                    { color: theme.colors.onSurface },
                  ]}
                >
                  ₹{totalAmount}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Flipkart Sticky Bottom Bar */}
          <View
            style={[
              styles.stickyBottom,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <View style={styles.bottomPriceContainer}>
              <Text
                style={{
                  fontSize: RFValue(12),
                  color: theme.colors.onSurfaceVariant,
                }}
              >
                Total Payable
              </Text>
              <Text
                style={[styles.bottomPrice, { color: theme.colors.onSurface }]}
              >
                ₹{totalAmount}
              </Text>
            </View>
            <View style={{ width: wp(45) }}>
              <CustomButton title="Place Order" onPress={handleCheckout} />
            </View>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text
            style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}
          >
            Your Cart is Empty
          </Text>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    gap: wp(3),
  },
  headerTitle: {
    fontSize: RFValue(18),
    fontFamily: Fonts.Bold,
  },
  addressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  deliverTo: {
    fontSize: RFValue(14),
    fontFamily: Fonts.Regular,
  },
  addressSub: {
    fontSize: RFValue(12),
    marginTop: hp(0.5),
  },
  changeBtn: {
    borderWidth: 1,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: wp(1),
  },
  card: {
    padding: wp(4),
    marginBottom: hp(1),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  cardTop: {
    flexDirection: 'row',
    gap: wp(4),
  },
  productImg: {
    width: wp(25),
    height: wp(25),
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: RFValue(14),
    fontFamily: Fonts.Medium,
  },
  productPrice: {
    fontSize: RFValue(16),
    fontFamily: Fonts.Bold,
    marginTop: hp(0.5),
  },
  deliveryText: {
    fontSize: RFValue(11),
    color: '#388E3C',
    marginTop: hp(0.5),
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    justifyContent: 'space-between',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    borderWidth: 1,
    width: wp(8),
    height: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(4),
  },
  qtyCount: {
    width: wp(10),
    alignItems: 'center',
  },
  removeBtn: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  removeText: {
    fontFamily: Fonts.Bold,
    fontSize: RFValue(13),
  },
  priceDetailsSection: {
    padding: wp(4),
    marginTop: hp(1),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  priceDetailsTitle: {
    fontSize: RFValue(16),
    fontFamily: Fonts.Bold,
    marginBottom: hp(1.5),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(0.8),
  },
  divider: {
    height: 1,
    marginVertical: hp(1),
  },
  totalAmountTitle: {
    fontSize: RFValue(16),
    fontFamily: Fonts.Bold,
  },
  stickyBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  bottomPriceContainer: {
    flexDirection: 'column',
  },
  bottomPrice: {
    fontSize: RFValue(18),
    fontFamily: Fonts.Bold,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: RFValue(18),
    fontFamily: Fonts.Medium,
  },
});
