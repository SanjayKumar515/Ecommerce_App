import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import {
  TextInput as PaperTextInput,
  TextInputProps,
  useTheme,
} from 'react-native-paper';
import { Colors } from '../../constant';

export interface CustomTextInputProps extends Omit<TextInputProps, 'theme'> {
  containerStyle?: ViewStyle;
}

const CustomTextInput = ( {
  containerStyle,
  style,
  ...props
}: CustomTextInputProps ) => {
  const theme = useTheme();

  return (
    <PaperTextInput
      mode="outlined"
      style={ [
        styles.input,
        { backgroundColor: theme.colors.background },
        style,
      ] }
      outlineColor={ Colors.PRIMARY[ 800 ] }
      activeOutlineColor={ Colors.PRIMARY[ 200 ] }
      theme={ { roundness: 10, colors: { primary: Colors.PRIMARY[ 200 ] } } }
      textColor={ theme.colors.onSurface }
      { ...props }
    />
  );
};

const styles = StyleSheet.create( {
  input: {
    fontSize: 16,
  },
} );

export default CustomTextInput;
