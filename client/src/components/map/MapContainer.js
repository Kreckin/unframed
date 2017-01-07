import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import geolib from 'geolib';
import getSpots from '../../lib/getSpots';
import getLatLong from '../../lib/getLatLong';
import LocateSelfIcon from './LocateSelfIcon';
import LensIcon from './LensIcon';

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

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.updateMapWithCurrentPosition = this.updateMapWithCurrentPosition.bind(this);
  }

  componentWillMount() {
    this.moveMapToCurrentPostion();
  }

  onRegionChangeComplete(newRegion) {
    // deets on latitude delta http://troybrant.net/blog/wp-content/uploads/2010/01/24-zoom-18-lat-lng-corners.png
    const distance = geolib.getDistance(
      { latitude: newRegion.latitude, longitude: newRegion.longitude },
      { latitude: newRegion.latitude + (newRegion.latitudeDelta / 2), longitude: newRegion.longitude }) / 1000; // conver to ks

    getSpots(newRegion.latitude, newRegion.longitude, distance,this.state.initialRegion)
          .then((data) => {
            this.setState({
              spots: data,
            });
          })
          .catch((reject) => {
            console.log('Error getting spots', reject);
          });
  }

  handleManualAddressInput(address) {
    getLatLong({ address }, (res) => {
      this.map.animateToRegion(
        { 
          latitude: res.lat, 
          longitude: res.lng, 
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        3
      );
      // this.region = { 
      //     latitude: res.lat, 
      //     longitude: res.lng, 
      //     latitudeDelta: LATITUDE_DELTA,
      //     longitudeDelta: LONGITUDE_DELTA,
      // };
    });
  }

  moveMapToCurrentPostion() {
    navigator.geolocation.getCurrentPosition((position, err) => {
        if (err) {
          console.log('Err getting current postion in moveMapToCurrentPostion', err);
        } else {
          this.map.animateToRegion(
            { 
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
            3
          );
        }
      });
  }

  updateMapWithCurrentPosition() {
    console.log('updating map with current position!');
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position, err) => {
        if (err) {
          reject(err);
        } else {
          this.setState({
            initialRegion: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
          });
          resolve(position.coords);
        }
      });
    });
  }
  render() {
    return (
      <View>
        <MapView 
          style={styles.map}
          showsUserLocation
          loadingEnabled
          showsCompass
          showsMyLocationButton
          initialRegion={this.state.initialRegion}
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
                description={spot.description}
                image={mapPin}
                //This adds the mini blurb on the screen
                //onPress={() => { reference[spot.id].showCallout(); }}
                //This changes the scene to the blurb with the spot passed down as props
                onCalloutPress={() => Actions.SpotInfo({ spot })}
              />
            ))}
        </MapView>
        <LensIcon 
          style={styles.lensIcon}
          handleManualAddressInput={this.handleManualAddressInput.bind(this)}
        />
      </View>
    );
  }
}
// sets the map as the width and heigh of the screen
const styles = {
  map: {
    position: 'absolute',
    top: 0,
    width,
    height
  }
  //If you want to style the lens icon, go to SearchAddress to style because 
  //for some reason it won't style in map container
};

export default MapContainer;


//        <View style={styles.navBar}>
        //   {this.state.platform === 'ios' ? 
        //   //IOS does not show the home button, so we have a custom one here that shows only for 
        //   //IOS phones (Android has their own)
        //   <LocateSelfIcon selectLocatorIcon={this.moveMapToCurrentPostion.bind(this)} /> : null }
        //   <LensIcon
        //     handleManualAddressInput={this.handleManualAddressInput.bind(this)}
        //   />
        //   <AddPhotoIcon />
        // </View>
