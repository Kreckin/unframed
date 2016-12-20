import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

const Login = () => {
  return (
    <View style={{ paddingTop: 65 }}>
        <TextInput 
        label='title'/
        placeholder='Cool street art'
        autocorrect={false}
        />
    </View>
  );
};

export default Login;