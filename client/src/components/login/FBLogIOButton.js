import React from 'react';
import { Actions } from 'react-native-router-flux';
import { 
  LoginButton, 
  AccessToken, 
  GraphRequest, 
  GraphRequestManager } from 'react-native-fbsdk';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View } from 'react-native';
import userService from '../../lib/userService';

const FBLogIOButton = React.createClass({
  render: () => {
    console.log('FBLogIOButton');

    return (
      <View>
        <LoginButton
          readPermissions={['public_profile']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log('error', error);
                // TODO handle error
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
                // TODO when user cancels
              } else {
                console.log('result', result);
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log('access token data', data.userID);
                    // userService.postLogin(data);
                    const photoRequest = new GraphRequest(
                      `/${data.userID}/picture?redirect=false`,
                      null,
                      (err, res) => {
                        if (error) console.log('Error from GraphRequest', err);
                        if (result) {
                          console.log('result from GraphRequest', res);
                        }
                      },
                    );
                    const infoRequest = new GraphRequest(
                      '/me',
                      null,
                      (err, res) => {
                        if (error) console.log('Error from GraphRequest', err);
                        if (result) console.log('result from GraphRequest', res);
                      },
                    );
                          
                    new GraphRequestManager()
                      .addRequest(photoRequest)
                      .addRequest(infoRequest)
                      .addBatchCallback((err, res) => {
                        if (err) console.log('err in addBatchCallback', err);
                        if (res) {
                          console.log('res in addBatchCallback', res);
                          Actions.MapContainer();
                        }
                      })
                      .start();
                  }
                );
              }
            }
          }
          onLogoutFinished={ () => {
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
      </View>
    );
  }
});

export default FBLogIOButton;
