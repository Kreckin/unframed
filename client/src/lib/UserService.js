import React from 'react';
import ReactNative from 'react-native';
const { AsyncStorage } = ReactNative;

let isLoggedIn = false;

const userService = {
  currentUser: {},
  loggedIn: () => {
    var something;
    return isLoggedIn;
  },

  getLoginStatus: () => {
    console.log('getting login status!');
    AsyncStorage.setItem('@MySuperStore:user', 'a user')
      .then((data) =>{
        console.log('data', data);
      })
      .catch((err) => {
        console.log('errrr', err);
      });


    return new Promise((resolve, reject) => {
      console.log('lets try something');
      AsyncStorage.getItem('@MySuperStore:user')
        .then((value) => {
          if (value !== null) {
            // We have data!!
            resolve(false);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  cacheUser: (user) => {
    return new Promise ((resolve, reject) => {
      AsyncStorage.setItem('@MySuperStore:user', user)
      .then((data) =>{
        console.log('cacheUser data', data);
        resolve();
      })
      .catch((err) => {
        console.log('err in cacheUser', err);
        reject(err);
      });
    });
  },

  logOut: () => {
    return new Promise ((resolve, reject) => {
      AsyncStorage.removeItem('@MySuperStore:user')
      .then((data) =>{
        console.log('logout data', data);
        resolve();
      })
      .catch((err) => {
        console.log('err in logout', err);
        reject(err);
      });
    });
  },

};

export default userService;
