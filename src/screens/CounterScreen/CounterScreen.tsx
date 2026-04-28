import { Text, View } from 'react-native';
import React from 'react';
import { MyButton } from '../../components';
import styles from './styles';

const CounterScreen = () => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>0</Text>
      <MyButton title="Add" onPress={ () => { } } />
      <MyButton title="Minus" onPress={ () => { } } />
    </View>
  );
};

export default CounterScreen;
