import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import getSpots from '../lib/getSpots';
import getLatLong from '../lib/getLatLong';

import AddPhotoIcon from './AddPhotoIcon';
import LocateSelfIcon from './LocateSelfIcon';
import LensIcon from './LensIcon';
//This gets the dimensions from the user's screen
const { height, width } = Dimensions.get('window');
const Platform = require('react-native').Platform;

//Here is a map stripped down to it's very basic core
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: [],
      showManualLocation: false,
      manualLocation: {},
      platform: Platform.OS
    };
    //commented out for now because re-rendering does not play nice with this currently
    //this.onRegionChange = this.onRegionChange.bind(this);
  }
  //This changes the region when the user moves around
  componentWillMount() {
    //when the map is first called it will get every spot from our database 
    //and change the spots state to use it
    this.getUserLocation();
    getSpots((data) => {
      this.setState({ spots: data });
    });
  }
  getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
        };
      this.setState({ region });
      console.log('Current location is', region);
      });
  }
  selectLocatorIcon() {
    this.setState({ showManualLocation: false });
    Actions.refresh();
  }
 
  handleManualAddressInput(address) {
    getLatLong({ address }, (res) => {
      this.setState({ 
        manualLocation: { 
          latitude: res.lat, 
          longitude: res.lng, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421 },
        showManualLocation: true
      });
    });
  }
  
  render() {
    return (
      <View>
        <View style={styles.navBar}>

          {this.state.platform === 'ios' ? 
          //IOS does not show the home button, so we have a custom one here that shows only for 
          //IOS phones (Android has their own)
          <LocateSelfIcon selectLocatorIcon={this.selectLocatorIcon.bind(this)} /> : null }
          <LensIcon
            handleManualAddressInput={this.handleManualAddressInput.bind(this)}
          />
          <AddPhotoIcon />
        </View>
        <MapView 
        style={styles.map}
        showsUserLocation
        showsScale
        loadingEnabled
        showsCompass
        showsMyLocationButton
        region={this.state.showManualLocation ? this.state.manualLocation : this.state.region}
        //this will change the region as the user moves around the map
        //onRegionChange={this.onRegionChange}
        >
        {this.state.spots.map(spot => (
            //This maps all the spots (passed down from app as props)
            <MapView.Marker
            //The ref is the weird workaround to the showCallout issue
              //ref={ref => { reference[spot.id] = ref; }}
              key={spot.id}
              coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
              title={spot.title}
              description={spot.category}
              image={spot.icon}
              //This adds the mini blurb on the screen
              //onPress={() => { reference[spot.id].showCallout(); }}
              //This changes the scene to the blurb with the spot passed down as props
              onCalloutPress={() => Actions.SpotInfo({ spot })}
            />
          ))}
        </MapView>
      </View>
    );
  }
}
// sets the map as the width and heigh of the screen
const styles = {
  map: {
    width,
    height
  },
  navBar: {
    backgroundColor: 'white', 
    marginTop: 30,
    height: 45, 
    borderBottomWidth: 1, 
    flex: 1, 
    justifyContent: 'center', 
    flexDirection: 'row'
  }
};

export default MapContainer;
