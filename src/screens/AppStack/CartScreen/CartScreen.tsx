import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  addToCart,
  removeFromCart,
  clearCart,
} from '../../../redux/features/CartSlice';
import { addOrder } from '../../../redux/features/OrderSlice';
import { useNavigation } from '@react-navigation/native';
import { API } from '../../../api';

const CartScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { cartData, totalAmount } = useSelector(
    (state: RootState) => state.cartItems,
  );
  const [suggestedProducts, setSuggestedProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const res = await API.get('products?limit=10');
      setSuggestedProducts(res.data.products);
    } catch (err) {
      console.log('Error fetching suggestions:', err);
    }
  };

  const handlePlaceOrder = () => {
    if (cartData.length === 0) return;

    const newOrder = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: [...cartData],
      totalAmount: totalAmount,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'On the way' as const,
    };
    // @ts-ignore
    dispatch(addOrder(newOrder));

    Alert.alert('Success', 'Order placed successfully!', [
      {
        text: 'OK',
        onPress: () => {
          dispatch(clearCart());
          navigation.navigate('Orders' as never);
        },
      },
    ]);
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text numberOfLines={2} style={styles.itemTitle}>
          {item.title}
        </Text>
        <Text style={styles.itemSub}>Seller: SuperComNet</Text>
        <View style={styles.itemPriceRow}>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
        </View>

        <View style={styles.qtySelector}>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => dispatch(removeFromCart(item.id))}
          >
            <Text>-</Text>
          </Pressable>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => dispatch(addToCart(item))}
          >
            <Text>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>My Cart</Text>

      {/* TOP TABS */}
      <View style={styles.topTabs}>
        <Pressable style={styles.activeTab}>
          <Text style={styles.activeTabText}>Flipkart</Text>
        </Pressable>
        <Pressable style={styles.inactiveTab}>
          <Text style={styles.inactiveTabText}>Minutes/Grocery</Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* EMPTY STATE */}
        {cartData.length === 0 && (
          <View style={styles.emptyContainer}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/2038/2038854.png',
              }}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyTitle}>Your cart is empty!</Text>
            <Text style={styles.emptySub}>Add items to it now.</Text>
          </View>
        )}

        {/* CART ITEMS LIST */}
        {cartData.length > 0 && (
          <View>
            {cartData.map(item => (
              <View key={item.id}>{renderCartItem({ item })}</View>
            ))}

            {/* PRICE SUMMARY */}
            <View style={styles.priceSummary}>
              <Text style={styles.summaryTitle}>Price Details</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Price ({cartData.length} items)
                </Text>
                <Text style={styles.summaryValue}>₹{totalAmount}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Charges</Text>
                <Text style={[styles.summaryValue, styles.freeText]}>FREE</Text>
              </View>

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>₹{totalAmount}</Text>
              </View>
            </View>
          </View>
        )}

        {/* SUGGESTED PRODUCTS (Dynamic from API) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested for You</Text>

          <FlatList
            data={suggestedProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.thumbnail }} style={styles.image} />

                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>

                <Text style={styles.price}>
                  ₹{item.price}{' '}
                  <Text style={styles.oldPrice}>
                    ₹{Math.round(item.price * 1.2)}
                  </Text>
                </Text>

                <Text style={styles.discount}>
                  {Math.round(item.discountPercentage)}% off
                </Text>

                <Pressable
                  style={styles.addBtn}
                  onPress={() => dispatch(addToCart(item))}
                >
                  <Text style={styles.addBtnText}>Add to cart</Text>
                </Pressable>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* STICKY BOTTOM BAR */}
      {cartData.length > 0 && (
        <View style={styles.stickyBottom}>
          <View style={styles.priceContainer}>
            <Text style={styles.totalValue}>₹{totalAmount}</Text>
            <Text
              style={[styles.summaryLabel, { fontSize: 12, color: '#2874F0' }]}
            >
              View Price Details
            </Text>
          </View>
          <Pressable style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderText}>PLACE ORDER</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
