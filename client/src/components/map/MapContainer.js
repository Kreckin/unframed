import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, Dimensions } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import geolib from 'geolib';
import getSpots from '../../lib/getSpots';
import getLatLong from '../../lib/getLatLong';
import LocateSelfIcon from './LocateSelfIcon';

//This gets the dimensions from the user's screen
const { height, width } = Dimensions.get('window');
const Platform = require('react-native').Platform;

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const mapPin = require('../../icons/map-pin.png');

//Here is a map stripped down to it's very basic core
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: [],
      platform: Platform.OS,
      initialRegion: {
        latitude: 30.2729,
        longitude: -97.7444,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };

    this.currentDevicePosition = {};
    this.pendingUpdate = false;

    // beacuse this isn't set in app.js when the app first loads
    this.props.setCurrentView('map');

    this.firstRegionChangeComplete = false; // used for debouncing

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.setCurrentDevicePosition = this.setCurrentDevicePosition.bind(this);
    this.moveMapToCurrentPostion = this.moveMapToCurrentPostion.bind(this);
    this.setCurrentDevicePosition = this.setCurrentDevicePosition.bind(this);
  }

  componentDidMount() {
    this.getCurrentPosition()
    .then((resolve) => {
      this.moveMapToCurrentPostion();
    });
  }

  componentWillReceiveProps(newProps) {
     if (newProps.newLocation) {
      this.handleAddressProps(newProps.newLocation);
    }
  }

  onRegionChangeComplete(newRegion) {
    // deets on latitude delta http://troybrant.net/blog/wp-content/uploads/2010/01/24-zoom-18-lat-lng-corners.png
    const distance = geolib.getDistance(
      { latitude: newRegion.latitude, longitude: newRegion.longitude },
      { latitude: newRegion.latitude + (newRegion.latitudeDelta / 2), longitude: newRegion.longitude }
      ) / 1000; // conver to kms

    if (this.firstRegionChangeComplete) {
      getSpots(newRegion.latitude, newRegion.longitude, distance, this.currentDevicePosition)
            .then((data) => {
              this.setState({
                spots: data,
              });
            })
            .catch((reject) => {
              console.log('Error getting spots', reject);
            });
    } else {
      this.firstRegionChangeComplete = true;
    }
  }

  handleAddressProps(address) {
    let self = this;
    if (!address.latitude || !address.longitude) {
      getLatLong({ address }, (res) => {
        self.map.animateToRegion(
          { 
            latitude: res.lat, 
            longitude: res.lng, 
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          3
        ); });
      this.pendingUpdate = false;
    } else {
          self.map.animateToRegion(
        { 
          latitude: address.latitude, 
          longitude: address.longitude, 
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        3
      ); 
    }
  }

  getCurrentPosition(callback) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position, err) => {
          if (err) {
            console.log('Err getting current postion in moveMapToCurrentPostion', err);
            reject(err);
          } else {
            this.setCurrentDevicePosition(position);
            resolve(position);
          }
        });
    });
  }

  moveMapToCurrentPostion() {
    this.map.animateToRegion(
      { 
        latitude: this.currentDevicePosition.latitude,
        longitude: this.currentDevicePosition.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      3
    );
  }

  setCurrentDevicePosition(position) {
    this.currentDevicePosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
  }

  render() {
    return (
      <View>
        <MapView 
          style={styles.map}
          showsUserLocation
          loadingEnabled
          showsMyLocationButton
          ref={ref => { this.map = ref; }}
          //this will change the region as the user moves around the map
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          {this.state.spots.map(spot => (
              //This maps all the spots (passed down from app as props)
              <MapView.Marker
              //The ref is the weird workaround to the showCallout issue
                //ref={ref => { reference[spot.id] = ref; }}
                key={spot.id}
                coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
                title={spot.title}
                description={`Score: ${parseInt(spot.percentage * 100)}%`}
                image={mapPin}
                //This adds the mini blurb on the screen
                //onPress={() => { reference[spot.id].showCallout(); }}
                //This changes the scene to the blurb with the spot passed down as props
                onCalloutPress={() => {
                  if (this.props.getMapSpotState() !== null){
                    this.props.setMapSpotState(spot);
                    this.props.setCurrentView('mapSpot');
                    Actions.MapSpot({ type: ActionConst.REFRESH, spot });
                  } else {
                    this.props.setMapSpotState(spot);
                    this.props.setCurrentView('mapSpot');
                    Actions.MapSpot({ spot });
                  }
                }}
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
    position: 'absolute',
    width,
    height
  }
  //If you want to style the lens icon, go to SearchAddress to style because 
  //for some reason it won't style in map container
};

export default MapContainer;

