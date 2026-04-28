import { TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../../assets/BackIcon';
import styles from './styles';

const MyBackButton = () => {
  // hooks
  const { goBack } = useNavigation();
  return (
    <TouchableOpacity onPress={ goBack } style={ styles.box }>
      <BackIcon width={ 30 } height={ 30 } />
    </TouchableOpacity>
  );
};

export default MyBackButton;
