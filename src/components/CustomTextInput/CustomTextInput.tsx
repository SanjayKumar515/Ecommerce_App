import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import {
  TextInput as PaperTextInput,
  TextInputProps,
  useTheme,
} from 'react-native-paper';

export interface CustomTextInputProps extends Omit<TextInputProps, 'theme'> {
  containerStyle?: ViewStyle;
}

const CustomTextInput = ({
  containerStyle,
  style,
  ...props
}: CustomTextInputProps) => {
  const theme = useTheme();

  return (
    <PaperTextInput
      mode="outlined"
      style={[
        styles.input,
        { backgroundColor: theme.colors.background },
        style,
      ]}
      outlineColor={theme.colors.primary}
      activeOutlineColor={theme.colors.primary}
      theme={{ roundness: 10, colors: { primary: theme.colors.primary } }}
      textColor={theme.colors.onSurface}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
  },
});

export default CustomTextInput;
