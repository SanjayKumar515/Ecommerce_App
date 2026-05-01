import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  Login,
  CartScreen,
  SingleProduct,
  WishlistScreen,
  OrderScreen,
  HelpCenterScreen,
  CouponsScreen,
  AddressScreen,
  PaymentScreen,
  LocationPickerScreen,
  DeliveryStatusScreen,
  SavedAddressesScreen,
  SavedCardsWalletScreen,
} from '../../screens';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabNavigation } from '../index';
import { Colors } from '../../constant';

const Stack = createNativeStackNavigator();

const AppNavigation = ({ theme }: { theme: any }) => {
  const { userData } = useSelector((state: RootState) => state.auth);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.PRIMARY[100] }}
      edges={['top']}
    >
      <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userData ? (
            <Stack.Group>
              <Stack.Screen name="root" component={TabNavigation} />
              <Stack.Screen name="SingleProduct" component={SingleProduct} />
              <Stack.Screen name="Cart" component={CartScreen} />
              <Stack.Screen name="Wishlist" component={WishlistScreen} />
              <Stack.Screen name="Orders" component={OrderScreen} />
              <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
              <Stack.Screen name="Coupons" component={CouponsScreen} />
              <Stack.Screen name="Address" component={AddressScreen} />
              <Stack.Screen name="Payment" component={PaymentScreen} />
              <Stack.Screen name="LocationPicker" component={LocationPickerScreen} />
              <Stack.Screen name="DeliveryStatus" component={DeliveryStatusScreen} />
              <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} />
              <Stack.Screen name="SavedCardsWallet" component={SavedCardsWalletScreen} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Login" component={Login} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigation;
