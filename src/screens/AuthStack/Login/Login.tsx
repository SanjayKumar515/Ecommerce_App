import { Image, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import React, { useState } from 'react';
import { CustomButton, CustomTextInput } from '../../../components';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/features/AuthSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import Images from '../../../constant/images';

const Login = () => {
  // states
  const [ email, setEmail ] = useState( 'emilys' );
  const [ password, setPassword ] = useState( 'emilyspass' );

  // hooks
  const dispatch = useDispatch<AppDispatch>();
  const { userData, isLoading } = useSelector( ( state: RootState ) => state.auth );

  // functions
  const handlingLogin = () => {
    const params = {
      username: email,
      password: password,
    };
    console.log( 'params:', params );
    dispatch( login( params ) );
  };

  const theme = useTheme();

  return (
    <View
      style={ [ styles.container, { backgroundColor: theme.colors.background } ] }
    >
      <Image source={ Images.ic_logo } style={ styles.logo } />

      <Text style={ styles.title }>Login</Text>
      <CustomTextInput
        value={ email }
        label="Enter Email"
        onChangeText={ setEmail }
        style={ styles.input }
        autoCapitalize="none"
      />
      <CustomTextInput
        value={ password }
        label="Enter Password"
        onChangeText={ setPassword }
        style={ styles.input }
        secureTextEntry
      />
      <CustomButton title="Login" onPress={ handlingLogin } />
    </View>
  );
};

export default Login;
