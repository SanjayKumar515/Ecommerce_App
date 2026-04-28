import React from 'react';
import { Home } from '../../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <SafeAreaView style={ { flex: 1 } }>
      <Tab.Navigator screenOptions={ { headerShown: false } }>
        <Tab.Screen
          name="Home"
          component={ Home }
          options={ {
            tabBarIcon: ( { color, size } ) => (
              <Icon name="home" color={ color } size={ size } />
            )
          } }
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabNavigation;
