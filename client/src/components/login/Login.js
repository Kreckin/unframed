import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';

import FBLogIOButton from './FBLogIOButton';

const Login = (props) => {
  return (
    <View style={styles.body}>
        <FBLogIOButton loginCallback={props.loginCallback} logoutCallback={props.logoutCallback} />
    </View>
  );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Login;
