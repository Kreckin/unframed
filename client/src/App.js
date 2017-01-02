import React, { Component } from 'react';
//If you need any view or text, etc tags, import them below
import { TextInput } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';
import MapContainer from './components/MapContainer';
import SpotInfo from './components/SpotInfo';
import UploadPhotoContainer from './components/UploadPhotoContainer';
//The following aren't used in our project (yet) so they are commented out
//import Login from './components/Login';
//import SavedList from './components/SavedList';
import FlaggedContent from './components/FlaggedContent';

// This displays a different color on the tab bar depending on whether the tab is selected or not, 
// and it's uncommented out for the time being
// const TabIcon = ({ selected, title }) => {
//   return (
//     <Text style={{ color: selected ? 'red' : 'black' }}>{title}</Text>
//   );
// };

class App extends Component {
  onDescriptionChange(description) {
    this.setState({ description });
  }
// Note: if you want to make the app render something different than the map on initial load, 
// use the 'initial' keyword inside that scene
// Just put it back into MapContainer before you push to master
    render() {
      return (
          <Router 
          hideNavBar
          //navigationBarStyle={{}}
          >
            <Scene key='root'>
              <Scene 
                key='MapContainer'
                initial
                component={MapContainer}
              />
              <Scene 
                key='UploadPhotoContainer'
                component={UploadPhotoContainer}
              />
              <Scene 
                key='SpotInfo'
                component={SpotInfo}
                title='SpotInfo'
              />
              <Scene 
                key='FlaggedContent'
                component={FlaggedContent}
                title='Flagged Content'
              />
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


//Here is the tab bar with (unfinished) saved list and login pages connected
// <Router>
//             <Scene key='root'>
//               <Scene
//                 key="tabBar"
//                 tabs
//                 tabBarStyle={{ backgroundColor: '#FFFFFF' }}
//               >
//               {/* Map Tab and its scenes */}
//                 <Scene key='Map' title='Map' icon={TabIcon}>
//                   <Scene 
//                     key='MapContainer'
//                     component={MapContainer}
//                     title='Map'
//                     spots={this.state.spots}
//                     //initial
//                   />
//                   <Scene 
//                     key='SpotInfo'
//                     component={SpotInfo}
//                     title='SpotInfo'
//                   />
//                 </Scene>
//               {/* Login Tab and its scenes */}
//                 <Scene key='LoginTab' title='Log In' icon={TabIcon}>
//                   <Scene 
//                     key='Login'
//                     component={Login}
//                     title='Log In'
//                   />
//                 </Scene>
//               {/* Saved List Tab and its scenes */}
//                 <Scene key='SavedListTab' title='Saved List' icon={TabIcon}>
//                   <Scene 
//                     key='Camera'
//                     component={SavedList}
//                     title='Camera'
//                   />
//                 </Scene>
//               </Scene>
//             </Scene>
//           </Router>
