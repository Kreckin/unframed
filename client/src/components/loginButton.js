import React, { Component } from 'react';
import FBSDK from 'react-native-fbsdk';
import { View, Text, TouchableOpacity } from 'react-native';

const {
  LoginButton,
  AccessToken
} = FBSDK;

const Login = React.createClass({
  render: function () {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
});

export default Login;
