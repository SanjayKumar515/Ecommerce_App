import { Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { MyButton } from '../../components';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/features/AuthSlice';
import { AppDispatch, RootState } from '../../redux/store';

const Login = () => {
  // states
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );

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

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Login</Text>
      <TextInput
        value={ email }
        placeholder="Enter Email"
        onChangeText={ setEmail }
        style={ styles.input }
        placeholderTextColor="grey"
        autoCapitalize="none"
      />
      <TextInput
        value={ password }
        placeholder="Enter Password"
        onChangeText={ setPassword }
        style={ styles.input }
        placeholderTextColor="grey"
      />
      <MyButton title="Login" onPress={ handlingLogin } />
    </View>
  );
};

export default Login;
