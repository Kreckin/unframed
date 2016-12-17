import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TabBarIOS,
  View,
  Dimensions
} from 'react-native';
//This gets the dimensions from the user's screen
const {height,width} = Dimensions.get('window');
import MapView from 'react-native-maps';

//Here is a map stripped down to it's very basic core
class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      region:{
        latitude: 30.2672,
        longitude: -97.7431,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }
  //This changes the region when the user moves around
  onRegionChange(region){
    this.setState({region})
  }
  render(){
    return (
      <View>
        <MapView style={styles.map} 
        region={this.state.region}
        onRegionChange={this.onRegionChange}
        />
      </View>
    )
  }
}
const styles={
  map:{
    width:width,
    height:height
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