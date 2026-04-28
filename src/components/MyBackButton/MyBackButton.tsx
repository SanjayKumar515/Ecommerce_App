import { TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import BackIcon from '../../assets/BackIcon';
import styles from './styles';

const MyBackButton = () => {
  // hooks
  const { goBack } = useNavigation();
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={ goBack } style={ [styles.box, { backgroundColor: theme.colors.primary }] }>
      <BackIcon width={ 30 } height={ 30 } />
    </TouchableOpacity>
  );
};

export default MyBackButton;
