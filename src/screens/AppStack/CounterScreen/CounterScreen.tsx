import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React from 'react';
import { CustomButton } from '../../../components';
import styles from './styles';

const CounterScreen = () => {
  const theme = useTheme();

  return (
    <View style={ [styles.container, { backgroundColor: theme.colors.background }] }>
      <Text style={ styles.title }>0</Text>
      <CustomButton title="Add" onPress={ () => { } } />
      <CustomButton title="Minus" onPress={ () => { } } />
    </View>
  );
};

export default CounterScreen;
