import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Icon from 'react-native-vector-icons/Ionicons';
import { MyBackButton } from '../../../components';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const OrderScreen = () => {
  const { orders } = useSelector((state: RootState) => state.orders);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order ID: {item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>

      {item.items.map((subItem: any, index: number) => (
        <View key={index} style={styles.itemRow}>
          <Image source={{ uri: subItem.thumbnail }} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text numberOfLines={1} style={styles.itemTitle}>
              {subItem.title}
            </Text>
            <Text style={styles.itemQty}>Qty: {subItem.quantity}</Text>
            <Text style={styles.itemPrice}>₹{subItem.price}</Text>
          </View>
          <View style={styles.statusBox}>
            <Icon
              name={
                item.status === 'Delivered'
                  ? 'checkmark-circle'
                  : 'time-outline'
              }
              size={RFValue(14)}
              color={item.status === 'Delivered' ? '#388E3C' : '#FBC02D'}
            />
            <Text
              style={[
                styles.statusText,
                { color: item.status === 'Delivered' ? '#388E3C' : '#FBC02D' },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
      ))}

      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>
          Total Amount:{' '}
          <Text style={styles.totalValue}>₹{item.totalAmount}</Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MyBackButton title="My Orders" />

      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: wp(3) }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="receipt-outline" size={RFValue(60)} color="#ccc" />
          <Text style={styles.emptyTitle}>No orders yet!</Text>
          <Text style={styles.emptySub}>
            When you place an order, it will appear here.
          </Text>
        </View>
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    elevation: 2,
    gap: wp(3),
  },
  headerTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: '#212121',
  },
  card: {
    backgroundColor: '#fff',
    padding: wp(3),
    marginBottom: hp(1.5),
    borderRadius: 8,
    elevation: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: hp(1),
    marginBottom: hp(1),
  },
  orderId: {
    fontSize: RFValue(12),
    color: '#878787',
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: RFValue(12),
    color: '#878787',
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: hp(1),
    alignItems: 'center',
  },
  itemImage: {
    width: wp(15),
    height: wp(15),
    resizeMode: 'contain',
  },
  itemInfo: {
    flex: 1,
    marginLeft: wp(3),
  },
  itemTitle: {
    fontSize: RFValue(13),
    color: '#212121',
  },
  itemQty: {
    fontSize: RFValue(11),
    color: '#878787',
  },
  itemPrice: {
    fontSize: RFValue(13),
    fontWeight: 'bold',
    color: '#212121',
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
  },
  statusText: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: hp(1),
    marginTop: hp(0.5),
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: RFValue(13),
    color: '#212121',
  },
  totalValue: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  emptyTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    marginTop: hp(2),
  },
  emptySub: {
    fontSize: RFValue(13),
    color: '#666',
    textAlign: 'center',
    marginTop: hp(1),
  },
});
