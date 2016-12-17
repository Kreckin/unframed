import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TabBarIOS,
  View,
  Dimensions
} from 'react-native';
<<<<<<< ed0487bf1c03c872761bfb4d7c635201c6781209
import Blurb from './Blurb';
import { Actions } from 'react-native-router-flux';
=======
>>>>>>> Starting over
//This gets the dimensions from the user's screen
const { height, width } = Dimensions.get('window');


//Here is a map stripped down to it's very basic core
class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      region: {
        latitude: 30.2672,
        longitude: -97.7431,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }
  //This changes the region when the user moves around
  onRegionChange(region) {
    this.setState({ region })
  }
<<<<<<< ed0487bf1c03c872761bfb4d7c635201c6781209
  getIconType(category) {
    if (category === 'nature') {
      return './icons/tree-small.png';
    }
  }
=======
>>>>>>> Starting over
  render() {
    return (
      <View>
        <MapView style={styles.map} 
        region={this.state.region}
        onRegionChange={this.onRegionChange}
<<<<<<< 653f3e63934d22fc3d047191029a72efbeee4d9a
<<<<<<< ed0487bf1c03c872761bfb4d7c635201c6781209
=======
>>>>>>> Pins mapping
        >
        {this.props.markers.map(marker => (
            <MapView.Marker
              key={marker.id}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
              description={marker.category}
<<<<<<< 653f3e63934d22fc3d047191029a72efbeee4d9a
              image={marker.image}
              onPress={() => Actions.Blurb({ marker: marker })}
              centerOffset={{ x: 0, y: -20 }}
            />
          ))}
        </MapView>
=======
        />
>>>>>>> Starting over
=======
            />
          ))}
        </MapView>
>>>>>>> Pins mapping
      </View>
    );
  }
}
const styles = {
  map: {
    width: width,
    height: height
  }
}
//Right now, getUserLocation keeps telling me we're in SF, so the stuff above puts Austin
// getUserLocation(){
//     navigator.geolocation.getCurrentPosition((position) => {
//           let currentLocation = {
//           latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//             //Do we need latitude and longitude delta?
//             // latitudeDelta: 0.01,
//             // longitudeDelta: 0.01
//           }
//         this.setState({currentLocation: currentLocation})
//         console.log(currentLocation)
//       })
//   }
//   componentDidMount(){
//     this.getUserLocation()
//   }
export default MapContainer;
