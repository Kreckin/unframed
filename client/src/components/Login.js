import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import FBLogin from './FBLogin';

const Login = () => {
  return (
    <View style={{ paddingTop: 65 }}>
        <Text>OMG we're totally logging in right now</Text>
        <FBLogin />
    </View>
  );
};

export default Login;