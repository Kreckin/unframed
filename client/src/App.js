import React, { Component } from 'react';
//If you need any view or text, etc tags, import them below
import { Text, View, Image } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';
import Login from './components/login/Login';
import MapContainer from './components/map/MapContainer';
import LensIcon from './components/map/LensIcon';
import SpotInfo from './components/spots/SpotInfo';
import UploadPhotoContainer from './components/spots/UploadPhotoContainer';
import FlaggedContent from './components/FlaggedContent';
import SavedItem from './components/SavedItem';
import SavedList from './components/SavedList';
import AddPhotoIcon from './components/map/AddPhotoIcon';
import Profile from './components/Profile';
import Spinner from './components/Spinner';
import userService from './lib/userService';
import FBLogIOButton from './components/login/FBLogIOButton';

const map = require('./icons/map.png');
const saved = require('./icons/star.png');
const profile = require('./icons/profile.png');

const TabIcon = ({ selected, title }) => {
  const iconMapper = {
    Map: map,
    Saved: saved,
    Profile: profile
  };
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={iconMapper[title]}
        style={{ height: 30, width: 30, tintColor: selected ? 'black' : '#EFEFF4' }}
      />
      <Text style={{ margin: 3, fontSize: 12, color: selected ? 'black' : '#EFEFF4' }}>{title}</Text>
    </View>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: null,
    };
  }

  componentWillMount() {
    userService.getLoginStatus()
      .then((resolve) => {
        console.log('back from userService', resolve);
        this.setState({
          isLoggedIn: resolve,
        });
      })
      .catch((reject) => {
        console.log('Error in componentWillMount getLoginStatus', reject);
      });
  }
// Note: if you want to make the app render something different than the map on initial load, 
// use the 'initial' keyword inside that scene
// Just put it back into MapContainer before you push to master
    render() {
      if (this.state.isLoggedIn !== null) {
        return (
        <Router
          navigationBarStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent', borderBottomWidth: 65 }}
          renderRightButton={AddPhotoIcon}
        >
              <Scene
                key="tabBar"
                tabs
                tabBarStyle={{ height: 65, backgroundColor: '#00B89C' }}
              >
              {/* Map Tab and its scenes */}
                <Scene key='Map' title='Map' initial={this.state.isLoggedIn} icon={TabIcon}>
                  <Scene 
                    key='MapContainer'
                    component={MapContainer}
                    renderLeftButton={LensIcon}
                  />
                  <Scene 
                    key='SpotInfo'
                    component={SpotInfo}
                    title='SpotInfo'
                  />
                </Scene>
              {/* Saved List Tab and its scenes */}
                <Scene key='SavedListTab' title='Saved' icon={TabIcon}>
                  <Scene 
                    key='SavedList'
                    component={SavedList}
                  />
                </Scene>
              {/* Profile Tab and its scenes */}
                <Scene key='ProfileTab' title='Profile' icon={TabIcon}>
                  <Scene 
                    key='Profile'
                    component={Profile}
                  />
                </Scene>
                <Scene 
                  key='UploadPhotoContainer'
                  component={UploadPhotoContainer}
                />
                <Scene 
                  key='FlaggedContent'
                  component={FlaggedContent}
                /> 
                <Scene 
                  key='Login'
                  initial={!this.state.isLoggedIn}
                  component={FBLogIOButton}
                />
              </Scene>
          </Router>
        );
      } else {
        return (
          <Spinner />
        );
      }
    }
}

export default App;

//  ,  ,.~"""""~~..
//   )\,)\`-,       `~._                                     .--._
//   \  \ | )           `~._                   .-"""""-._   /     `.
//  _/ ('  ( _(\            `~~,__________..-"'          `-<        \
//  )   )   `   )/)   )        \                            \,-.     |
// ') /)`      \` \,-')/\      (                             \ /     |
// (_(\ /7      |.   /'  )'  _(`                              Y      |
//     \       (  `.     ')_/`                                |      /
//      \       \   \         unexpected                      |)    (
//       \ _  /\/   /                                         (      `~.
//        `-._)     |                                        / \        `,
//                  |                          |           .'   )      (`
//                  \                        _,\          /     \_    (`
//                   `.,      /       __..'7"   \         |       )  (
//                   .'     _/`-..--""      `.   `.        \      `._/
//                 .'    _.j     /            `-.  `.       \
//               .'   _.'   \    |               `.  `.      \
//              |   .'       ;   ;               .'  .'`.     \
//              \_  `.       |   \             .'  .'   /    .'
//                `.  `-, __ \   /           .'  .'     |   (
//                  `.  `'` \|  |           /  .-`     /   .'
//                    `-._.--t  ;          |_.-)      /  .'
//                           ; /           \  /      / .'
//                          / /             `'     .' /
//                         /,_\                  .',_(
//                        /___(                 /___(

//Here is the tab bar with (unfinished) saved list and login pages connected
// <Router 
//           hideNavBar
//           //navigationBarStyle={{}}
//           >
//             <Scene key='root'>
//               <Scene 
//                 key='MapContainer'
//                 initial
//                 component={MapContainer}
//               />
//               <Scene 
//                 key='UploadPhotoContainer'
//                 component={UploadPhotoContainer}
//               />
//               <Scene 
//                 key='SpotInfo'
//                 component={SpotInfo}
//                 title='SpotInfo'
//               />
//               <Scene 
//                 key='FlaggedContent'
//                 component={FlaggedContent}
//                 title='Flagged Content'
//               />
//               <Scene 
//                 key='SavedItem'
//                 component={SavedItem}
//                 title='Saved Item'
//               />
//             </Scene>
//           </Router>
