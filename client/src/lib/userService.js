import { AsyncStorage } from 'react-native';
import {
  AccessToken, 
  GraphRequest, 
  GraphRequestManager } from 'react-native-fbsdk';
import config from './config.js';

const userService = {
  currentUser: {},

  getLoginStatus: () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('@MySuperStore:user')
        .then((value) => {
          if (value !== null) {
            // We have data!!
            // console.log('from local cache', value);
            userService.currentUser = JSON.parse(value);
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  cacheAndPostCurrentUser: () => {


    // console.log('before postPromise Definition');
    //send a fetch rquest with our postConfig file, complete with a body that contains our simulated form
    const postPromise = fetch(`${config.apiUrl}/users`, postConfig)
        .then((response) => {
          return response.json()
        })
        .then((response) =>{
          // console.log('userid?', response);
          userService.currentUser = response; 
        })
        .then(() => {
          return cachePromise() })
        .catch(error => console.log(error));

    return postPromise;
  },

  logOut: () => {
    return new Promise ((resolve, reject) => {
      AsyncStorage.removeItem('@MySuperStore:user')
      .then((data) =>{
        userService.currentUser = {};
        resolve();
      })
      .catch((err) => {
        console.log('err in logout', err);
        reject(err);
      });
    });
  },

  loginHandler: (error, result, cb) => {
    return new Promise((resolve, reject) => {
      if (error) {
        console.log('error', error);
        // TODO handle error
      } else if (result.isCancelled) {
        console.log('login was cancelled.');
        // TODO when user cancels
      } else {
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            const photoRequest = new GraphRequest(
              `/${data.userID}/picture?redirect=0&type=large`,
              null,
              (err, res) => {
                if (err) console.log('Error from GraphRequest', err);
                if (res) {
                  // console.log('got profile url', res);
                  userService.currentUser.profileUrl = res.data.url;
                }
              },
            );
            const infoRequest = new GraphRequest(
              '/me',
              null,
              (err, res) => {
                if (error) console.log('Error from GraphRequest', err);
                if (res) {
                  userService.currentUser.displayName = res.name;
                  userService.currentUser.facebookID = res.id;
                }
              },
            );

            new GraphRequestManager()
              .addRequest(photoRequest)
              .addRequest(infoRequest)
              .addBatchCallback((err, res) => {
                if (err) console.log('err in addBatchCallback', err);
                if (res) {
                  userService.cacheAndPostCurrentUser()
                    .then(() => {
                      resolve(true);
                    })
                    .catch((err) => {
                      console.log('error caching current user');
                      reject(false);
                    });
                }
              })
              .start();
          }
        );
      }
    });
  },
  changeShowSpots: (userID) => {
    return fetch(`${config.apiUrl}/users/${userID}/settings/showAllSpots`, postConfig)
          .then((response) => response.json())
          .then((user) => {
            userService.currentUser = user;
            cachePromise();
          }).catch((err) => {
            console.log('error in showSpots in userService',err)
          });
  } 
};
const postConfig = {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json',
  },
  body: JSON.stringify(userService.currentUser),
};
function cachePromise()  { 
  new Promise ((resolve, reject) => {
    AsyncStorage.setItem('@MySuperStore:user', JSON.stringify(userService.currentUser))
    .then((data) => {
      return;
    })
    .catch((err) => {
      console.log('err in cacheAndPostCurrentUser', err);
      reject(err);
    });
  });
}

export default userService;
