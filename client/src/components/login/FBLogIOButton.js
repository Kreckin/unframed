import React from 'react';
import { Actions } from 'react-native-router-flux';
import { LoginButton } from 'react-native-fbsdk';
import { StyleSheet, View } from 'react-native';
import userService from '../../lib/userService';

const FBLogIOButton = (props) => {
  return (
    <LoginButton
      readPermissions={['public_profile']}
      onLoginFinished={(error, result) => {
        userService.loginHandler(error, result)
          .then((res) => {
            props.loginCallback(res);
          })
          .catch((res) => {
            props.loginCallback(res);
          });
      }}
      onLogoutFinished={() => {
          userService.logOut()
            .then(() => {
              props.logoutCallback();
            })
            .catch(() => {
              props.logoutCalback();
            });
        }
      } 
    />
  );
};

export default FBLogIOButton;
