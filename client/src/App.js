import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';
import MapContainer from './components/MapContainer';
import Icon from './components/Icon';
import Blurb from './components/Blurb';
import Login from './components/Login';
import SavedList from './components/SavedList';

//This displays a different color depending on whether the tab is selected or not
const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
  );
};


class App extends Component {
<<<<<<< b1faa7092e073547398c1451b6692937c918425c
  state={
    markers: [{ id: 1, latitude: 30.268800, longitude: -97.740216, title: 'Caseys bat guy', image: require('./icons/tree-small.png'), category: 'nature' },
        { id: 2, latitude: 30.269946, longitude: -97.743531, title: 'An unexpected pony', image: require('./icons/tree-small.png'), category: 'nature' }]
  }

=======
	state={
		showSelectedIcon: false,
		markers: [
		{ id: 1, latitude: 30.268800, longitude: -97.740216, title: 'Caseys bat guy', image: require('./icons/small-tree.png'), category: 'nature' },
		{ id: 2, latitude: 30.269946, longitude: -97.743531, title: 'An unexpected pony', image: require('./icons/small-tree.png'), category: 'nature' }]
	}
>>>>>>> stuck
    render() {
      return (
          <Router>
            <Scene key='root'>
              <Scene
                key="tabBar"
                tabs
                tabBarStyle={{ backgroundColor: '#FFFFFF' }}
              >
              {/* Map Tab and its scenes */}
                <Scene key='Map' title='Map' icon={TabIcon}>
                  <Scene 
                    key='MapContainer'
                    component={MapContainer}
                    title='Map'
                    markers={this.state.markers}
                    //initial
                  />
                  <Scene 
                    key='Blurb'
                    component={Blurb}
                    title='Blurb'
                  />
                </Scene>
              {/* Login Tab and its scenes */}
                <Scene key='LoginTab' title='Log In' icon={TabIcon}>
                  <Scene 
                    key='Login'
                    component={Login}
                    title='Log In'
                  />
                </Scene>
              {/* Saved List Tab and its scenes */}
                <Scene key='SavedListTab' title='Saved List' icon={TabIcon}>
                  <Scene 
                    key='SavedList'
                    component={SavedList}
                    title='Saved List'
                  />
                </Scene>
              </Scene>
            </Scene>
          </Router>
        );
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