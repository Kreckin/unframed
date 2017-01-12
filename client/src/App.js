import React, { Component } from 'react';
//If you need any view or text, etc tags, import them below
import { Text, View, Image } from 'react-native';

import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import Login from './components/login/Login';
import MapContainer from './components/map/MapContainer';
import SpotInfo from './components/spots/SpotInfo';
import UploadPhotoContainer from './components/addSpot/UploadPhotoContainer';
import FlaggedContent from './components/spots/FlaggedContent';
import SavedList from './components/saved/SavedList';
import Profile from './components/profile/Profile';
import Spinner from './components/Spinner';

import SearchWorld from './components/search/SearchWorld';

import userService from './lib/userService';

const Platform = require('react-native').Platform;

const TabIcon = ({ selected, title }) => {
  const iconMapper = {
    Map: require('./icons/map.png'),
    Add: require('./icons/camera-big.png'),
    Saved: require('./icons/star.png'),
    Profile: require('./icons/profile.png'),
    Search: require('./icons/globe.png'),
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

    // view states
    this.currentView = null;
    this.previousView = null;
    this.viewingSpotInMap = null;
    this.viewingSpotInSavedList = null;


    this.loginCallback = this.loginCallback.bind(this);
    this.logoutCallback = this.logoutCallback.bind(this);

    // view state funcs
    this.setCurrentView = this.setCurrentView.bind(this);
    this.backButtonHandler = this.backButtonHandler.bind(this);
    this.setMapSpotState = this.setMapSpotState.bind(this);
    this.setSavedListState = this.setSavedListState.bind(this);
  }

  componentWillMount() {
    userService.getLoginStatus()
      .then((resolve) => {
        this.setState({
          isLoggedIn: resolve,
        });
      })
      .catch((reject) => {
        console.log('Error in componentWillMount getLoginStatus', reject);
      });
  }

  loginCallback(res) {
    this.setState({
      isLoggedIn: res,
    });
  }

  logoutCallback(res) {
    this.setState({
      isLoggedIn: false,
    });
  }

  // this is used to store current view state as we don't know when someone may hit back
  setCurrentView(newView, newViewData = null) {
    // console.log('setting current view to ', newView);
    this.previousView = this.currentView;
    this.currentView = newView;
  }
  // overwrites normal back button handler to update the state in current view
  backButtonHandler() {
    if (this.currentView === 'mapSpot') {
      this.viewingSpotInMap = null;
      this.setCurrentView('map');
    } else if (this.currentView === 'savedSpot') {
      this.viewingSpotInSavedList = null;
      this.setCurrentView('savedList');
    }

    Actions.pop(); // now go back
  }

  setMapSpotState(newStateData) {
    this.viewingSpotInMap = newStateData;
  }

  setSavedListState(newStateData) {
    this.viewingSpotInSavedList = newStateData;
  }

// Note: if you want to make the app render something different than the map on initial load, 
// use the 'initial' keyword inside that scene
// Just put it back into MapContainer before you push to master
render() {
      if (this.state.isLoggedIn !== null) {
        if (!this.state.isLoggedIn) {
          return (
            <Login loginCallback={this.loginCallback} logoutCallback={this.logoutCallback} />
          );
        } else {
          return (
            <Router
              navigationBarStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent', borderBottomWidth: 65 }}
              //NEED TO FIGURE OUT A WAY TO REMOVE THIS FOR ANDROID
              backButtonImage={Platform.OS === 'ios' ? 
              require('./icons/backButton.png') : null}
              onBack={this.backButtonHandler}
              setCurrentView={this.setCurrentView}
              setMapSpotState={this.setMapSpotState}
              setSavedListState={this.setSavedListState}
            >
              <Scene
                key="tabBar"
                tabs
                tabBarStyle={{ height: 65, backgroundColor: '#00B89C' }}
              >
                {/* Map Tab and its scenes */}
                <Scene key='Map'
                  title='Map'
                  icon={TabIcon}
                  onPress={() => {
                    if (this.viewingSpotInMap !== null && this.currentView === 'mapSpot') {
                      this.backButtonHandler();
                    } else if (this.viewingSpotInMap !== null && this.currentView !== 'mapSpot') { // refresh with spot in state
                      // saved spot in state
                      this.setCurrentView('mapSpot');
                      Actions.MapSpot({ type: ActionConst.REFRESH, setMapSpotState: this.setMapSpotState, setCurrentView: this.setCurrentView });
                    } else { // user is going back
                      // no map spot in state
                      this.setCurrentView('map');
                      Actions.MapContainer({ type: ActionConst.REFRESH, setMapSpotState: this.setMapSpotState, setCurrentView: this.setCurrentView });
                    }
                  }}
                >
                  <Scene 
                    key='MapContainer'
                    component={MapContainer}
                  />
                  <Scene 
                    key='MapSpot'
                    component={SpotInfo}
                  />
                  <Scene 
                    key='FlaggedContent'
                    component={FlaggedContent}
                  /> 
                </Scene>
                {/* Search bar and its scenes */}
                <Scene 
                key='SearchTab' 
                title='Search' 
                icon={TabIcon}
                onPress={() => {
                  this.setCurrentView('search');
                  Actions.SearchTab();
                }}
                >
                  <Scene 
                    key='Search'
                    component={SearchWorld}
                  />
                </Scene>
                {/* Add Spot Tab and its scenes */}
                <Scene 
                key='CameraTab' 
                title='Add' 
                icon={TabIcon}
                onPress={() => {
                  this.setCurrentView('uploadPhotoContainer');
                  Actions.CameraTab();
                }}
                >
                  <Scene 
                    key='UploadPhotoContainer'
                    component={UploadPhotoContainer}
                  />
                </Scene>
                {/* Saved List Tab and its scenes */}
                <Scene 
                  key='SavedListTab'
                  title='Saved' 
                  icon={TabIcon}
                  onPress={() => {
                    if (this.viewingSpotInSavedList !== null && this.currentView === 'savedSpot') {
                      this.backButtonHandler();
                    } else if (this.viewingSpotInSavedList !== null && this.currentView !== 'savedSpot') { 
                      // refresh with spot in state
                      this.setCurrentView('savedSpot');
                      Actions.SavedSpot({ type: ActionConst.REFRESH, setSavedListState: this.setSavedListState, setCurrentView: this.setCurrentView });
                    } else {
                      // no saved spot in state
                      this.setCurrentView('savedList');
                      Actions.SavedList({ type: ActionConst.REFRESH, setSavedListState: this.setSavedListState, setCurrentView: this.setCurrentView });
                    }
                  }}
                >
                  <Scene 
                    key='SavedList'
                    component={SavedList}
                  />
                  <Scene 
                    key='SavedSpot'
                    component={SpotInfo}
                  />
                </Scene>
                {/* Profile Tab and its scenes */}
                <Scene 
                  key='ProfileTab' 
                  title='Profile'
                  icon={TabIcon}
                  onPress={() => {
                    this.setCurrentView('profile');
                    Actions.ProfileTab();
                  }}
                >
                  <Scene 
                    key='Profile'
                    component={Profile}
                    logoutCallback={this.logoutCallback}
                    loginCallback={this.loginCallback}
                  />
                </Scene>
              </Scene>
            </Router>
          );
        }
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
