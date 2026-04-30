import { TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import BackIcon from '../../assets/BackIcon';
import styles from './styles';

interface MyBackButtonProps {
  title: string;
}

const MyBackButton = ({ title }: MyBackButtonProps) => {
  // hooks
  const { goBack } = useNavigation();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={goBack}
        style={[styles.box, { backgroundColor: theme.colors.primary }]}
      >
        <BackIcon width={30} height={30} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default MyBackButton;
