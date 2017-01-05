import React from 'react';
import { Actions } from 'react-native-router-flux';
import { LoginButton } from 'react-native-fbsdk';
import { StyleSheet, View } from 'react-native';
import userService from '../../lib/userService';

const FBLogIOButton = React.createClass({
  render: () => {
    return (
      <LoginButton
        readPermissions={['public_profile']}
        onLoginFinished={userService.loginHandler}
        onLogoutFinished={() => {
            console.log('onLogoutFinished');
            userService.logOut()
              .then(() => {
                console.log('logged out');
              })
              .catch(() => {
                Actions.Login();   
              });
          }
        } 
      />
    );
  }
});

export default FBLogIOButton;
