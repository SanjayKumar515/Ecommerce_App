import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { MyBackButton } from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors, Fonts } from '../../../constant';

interface Coupon {
  id: string;
  code: string;
  discount: string;
  title: string;
  description: string;
  expiry: string;
  color: string;
}

const COUPONS: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME10',
    discount: '10% OFF',
    title: 'Welcome Discount',
    description: 'Get 10% off on your first order.',
    expiry: 'Valid until 31 Dec, 2026',
    color: '#2874F0',
  },
  {
    id: '2',
    code: 'FESTIVE50',
    discount: '₹500 OFF',
    title: 'Festive Special',
    description: 'Flat ₹500 off on orders above ₹2000.',
    expiry: 'Valid until 15 May, 2026',
    color: '#E91E63',
  },
  {
    id: '3',
    code: 'FREESHIP',
    discount: 'FREE SHIP',
    title: 'Free Delivery',
    description: 'No delivery charges on your next purchase.',
    expiry: 'Valid until 20 Jun, 2026',
    color: '#4CAF50',
  },
  {
    id: '4',
    code: 'TECH20',
    discount: '20% OFF',
    title: 'Electronics Sale',
    description: 'Exclusive discount on all tech gadgets.',
    expiry: 'Valid until 01 Jul, 2026',
    color: '#FF9800',
  },
];

const CouponsScreen = () => {
  const renderCoupon = ({ item }: { item: Coupon }) => (
    <View style={styles.couponCard}>
      <View style={[styles.leftSection, { backgroundColor: item.color }]}>
        <Text style={styles.discountText}>{item.discount}</Text>
        <View style={styles.cutoutTop} />
        <View style={styles.cutoutBottom} />
      </View>
      <View style={styles.rightSection}>
        <View style={styles.infoContainer}>
          <Text style={styles.couponTitle}>{item.title}</Text>
          <Text style={styles.couponDesc}>{item.description}</Text>
          <Text style={styles.expiryText}>{item.expiry}</Text>
        </View>
        <View style={styles.codeContainer}>
          <View style={styles.dashLine} />
          <TouchableOpacity
            style={[styles.copyBtn, { borderColor: item.color }]}
            onPress={() => {}}
          >
            <Text style={[styles.copyBtnText, { color: item.color }]}>
              {item.code}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MyBackButton title="My Coupons" />

      <FlatList
        data={COUPONS}
        renderItem={renderCoupon}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Icon name="gift-outline" size={RFValue(60)} color="#ccc" />
            <Text style={styles.emptyText}>
              No coupons available at the moment.
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CouponsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
  },
  listContent: {
    padding: wp(4),
    paddingBottom: hp(5),
  },
  couponCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: wp(3),
    marginBottom: hp(2),
    height: hp(15),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  leftSection: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(2),
    position: 'relative',
  },
  discountText: {
    color: '#fff',
    fontSize: RFValue(18),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Fonts.Bold,
  },
  cutoutTop: {
    position: 'absolute',
    top: -wp(2.5),
    right: -wp(2.5),
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    backgroundColor: '#F7F7F8',
  },
  cutoutBottom: {
    position: 'absolute',
    bottom: -wp(2.5),
    right: -wp(2.5),
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    backgroundColor: '#F7F7F8',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    padding: wp(3),
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  couponTitle: {
    fontSize: RFValue(14),
    fontFamily: Fonts.SemiBold,
    color: '#333',
    marginBottom: hp(0.5),
  },
  couponDesc: {
    fontSize: RFValue(11),
    fontFamily: Fonts.Regular,
    color: '#666',
    marginBottom: hp(1),
  },
  expiryText: {
    fontSize: RFValue(9),
    fontFamily: Fonts.Medium,
    color: '#999',
  },
  codeContainer: {
    width: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dashLine: {
    position: 'absolute',
    left: -wp(1),
    height: '80%',
    borderLeftWidth: 1,
    borderColor: '#eee',
    borderStyle: 'dashed',
  },
  copyBtn: {
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
    borderWidth: 1,
    borderRadius: wp(1),
    backgroundColor: '#fff',
  },
  copyBtnText: {
    fontSize: RFValue(10),
    fontFamily: Fonts.Bold,
  },
  emptyContainer: {
    flex: 1,
    marginTop: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: hp(2),
    fontSize: RFValue(14),
    color: '#999',
    fontFamily: Fonts.Medium,
  },
});
