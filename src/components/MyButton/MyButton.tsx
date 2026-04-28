import { ActivityIndicator, Pressable, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';

interface MyButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
}

const MyButton: React.FC<MyButtonProps> = ( { title, onPress, isLoading } ) => {
  return (
    <TouchableOpacity onPress={ onPress } style={ styles.container }>
      <Text style={ styles.title }>{ title }</Text>
      { isLoading && <ActivityIndicator size="small" color={ 'white' } /> }
    </TouchableOpacity>
  );
};

export default MyButton;
