import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Account, CartScreen, Home, CategoryScreen } from '../../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Fonts } from '../../constant';

const Tab = createBottomTabNavigator();

const CartIconWithBadge = ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => {
  const cartCount = useSelector(
    (state: RootState) => state.cartItems.cartData.length,
  );

  return (
    <View
      style={{
        width: size + 10,
        height: size + 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name="cart" color={color} size={size} />
      {cartCount > 0 && (
        <View style={badgeStyles.badge}>
          <Text style={badgeStyles.badgeText}>
            {cartCount > 9 ? '9+' : cartCount}
          </Text>
        </View>
      )}
    </View>
  );
};

const badgeStyles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#E53935',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
    lineHeight: 11,
  },
});

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: Fonts.Medium,
          fontSize: 12,
        },
        tabBarActiveTintColor: '#2874F0',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="grid" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CartIconWithBadge color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
