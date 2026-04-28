import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login, CounterScreen, CartScreen, SingleProduct } from '../../screens';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabNavigation from '../TabNavigation/TabNavigation';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {

  const { userData } = useSelector( ( state: RootState ) => state.auth );
  console.log(
    '🚀 ~ file: AppNavigation.js:17 ~ AppNavigation ~ userData:',
    userData,
  );
  return (
    <SafeAreaView style={ { flex: 1 } }>
      <NavigationContainer>
        <Stack.Navigator screenOptions={ { headerShown: false } }>
          { userData ? (
            <Stack.Group>
              <Stack.Screen name="root" component={ TabNavigation } />
              <Stack.Screen name="SingleProduct" component={ SingleProduct } />
              <Stack.Screen name="Cart" component={ CartScreen } />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Login" component={ Login } />
              <Stack.Screen name="CounterScreen" component={ CounterScreen } />
            </Stack.Group>
          ) }
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigation;
