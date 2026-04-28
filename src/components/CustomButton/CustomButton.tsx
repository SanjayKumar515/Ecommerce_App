import { ActivityIndicator, Pressable, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';

import { useTheme } from 'react-native-paper';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  borderRadius?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ( { title, onPress, isLoading, borderRadius = 10 } ) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={ onPress } style={ [styles.container, { backgroundColor: theme.colors.primary, borderRadius }] }>
      <Text style={ [styles.title, { color: theme.colors.onPrimary }] }>{ title }</Text>
      { isLoading && <ActivityIndicator size="small" color={ theme.colors.onPrimary } /> }
    </TouchableOpacity>
  );
};

export default CustomButton;
