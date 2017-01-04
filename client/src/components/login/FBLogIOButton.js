import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import getUser from '../../lib/getUser.js';

const FBSDK = require('react-native-fbsdk');

const {
  LoginButton,
  AccessToken
} = FBSDK;

var FBLogIOButton = React.createClass({
  render: function() {
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
                    console.log(data);
                    getUser(data.userID).then((user) => {
                      Actions.MapContainer();
                    });
                  }
                );
              }
            }
          }
          onLogoutFinished={() => {
            alert('logged out');
            Actions.Profile();   
            }
          } 
        />
      </View>
    );
  }
});

export default FBLogIOButton;
