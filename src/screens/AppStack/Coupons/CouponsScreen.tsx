import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { MyBackButton } from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import styles from './styles';

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
  const renderCoupon = ( { item }: { item: Coupon } ) => (
    <View style={ styles.couponCard }>
      <View style={ [ styles.leftSection, { backgroundColor: item.color } ] }>
        <Text style={ styles.discountText }>{ item.discount }</Text>
        <View style={ styles.cutoutTop } />
        <View style={ styles.cutoutBottom } />
      </View>
      <View style={ styles.rightSection }>
        <View style={ styles.infoContainer }>
          <Text style={ styles.couponTitle }>{ item.title }</Text>
          <Text style={ styles.couponDesc }>{ item.description }</Text>
          <Text style={ styles.expiryText }>{ item.expiry }</Text>
        </View>
        <View style={ styles.codeContainer }>
          <View style={ styles.dashLine } />
          <TouchableOpacity
            style={ [ styles.copyBtn, { borderColor: item.color } ] }
            onPress={ () => { } }
          >
            <Text style={ [ styles.copyBtnText, { color: item.color } ] }>
              { item.code }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={ styles.container }>
      <MyBackButton title="My Coupons" />

      <FlatList
        data={ COUPONS }
        renderItem={ renderCoupon }
        keyExtractor={ item => item.id }
        contentContainerStyle={ styles.listContent }
        showsVerticalScrollIndicator={ false }
        ListEmptyComponent={ () => (
          <View style={ styles.emptyContainer }>
            <Icon name="gift-outline" size={ RFValue( 60 ) } color="#ccc" />
            <Text style={ styles.emptyText }>
              No coupons available at the moment.
            </Text>
          </View>
        ) }
      />
    </View>
  );
};

export default CouponsScreen;


