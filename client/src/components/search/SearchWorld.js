import React, { Component } from 'react';
import { View, Image, Dimensions, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Carousel from 'react-native-looped-carousel';

const { height, width } = Dimensions.get('window');

class SearchWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };

    // this.onSearch = this.onSearch.bind(this);
  }
  onSearch() {
    Actions.MapContainer({ type: ActionConst.REFRESH, newLocation: this.state.address });
    this.setState({ address: '' });
  }
  
  render() {
    const carouselImages = [
      { source: require('../../images/polaroids/paris.png'),
      location: { latitude: 48.8566, longitude: 2.3522 } },
      { source: require('../../images/polaroids/austin.png'),
      location: { latitude: 30.2672, longitude: -97.7431 } },
      { source: require('../../images/polaroids/berlin.png'),
      location: { latitude: 52.52, longitude: 13.405 } },
      { source: require('../../images/polaroids/newyork.png'), 
      location: { latitude: 40.7128, longitude: -74.0059 } },
      { source: require('../../images/polaroids/mexicocity.png'), 
      location: { latitude: 19.4326, longitude: -99.1332 } },
      { source: require('../../images/polaroids/london.png'), 
      location: { latitude: 51.5074, longitude: -0.1278 } },
    ];
    return (
    <View>
      <StatusBar
        barStyle='light-content'
      />
      <Image source={require('../../images/greenMap.png')} style={styles.backgroundPic}>
        <View style={styles.blackContainer}> 
          <View>
            <Text style={styles.differentPlaceText}>Check out other cities</Text>
            <View style={styles.searchContainer}>
              
              <View style={styles.inputView}>
                <TextInput 
                style={styles.textInputStyle}
                autoCapitalize={'sentences'}
                label='address'
                placeholder='  Type any address here'
                value={this.state.address}
                onChangeText={(address) => this.setState({ address })}
                placeholderTextColor={'#EFEFF4'}
                selectionColor={'#006F60'}
                clearButtonMode={'while-editing'}
                />
              </View>
              <TouchableOpacity
                onPress={this.onSearch.bind(this)}
              >
                <Image
                  source={require('../../icons/search.png')}
                  style={styles.iconStyle}
                />
            </TouchableOpacity>
            </View>
          </View>
          <View style={styles.carouselContainer}>
          <Text style={styles.locationHeaderText}>Tap to select a location</Text>
          <Carousel style={{ height: 250, width: 350, alignSelf: 'center' }}>
           {
            carouselImages.map((image, idx) => (
              <TouchableOpacity 
                key={idx}
                onPress={() => {
                    Actions.MapContainer({ type: ActionConst.REFRESH, newLocation: image.location });
                }}
              >
                <Image style={styles.imageStyle} source={image.source} key={idx} />
              </TouchableOpacity>
            ))
          }
          </Carousel>
        </View>
        </View>
      </Image>
    </View>
    );
  }
}
const styles = {
  navBar: {
    width,
    backgroundColor: '#006F60',
    height: 65,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  navBarText: {
    marginTop: 10,
    color: '#EFEFF4',
    fontSize: 24,
    textAlign: 'center'
  },
  blackContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: height - 65,
    width,
    marginHorizontal: 15
  },
  backgroundPic: {
    height,
    width
  },
  searchContainer: {
    flexDirection: 'row',
  },
  inputView: {
    borderBottomWidth: 2,
    width: width - 80,
    borderColor: '#EFEFF4',
  },
  textInputStyle: { 
    backgroundColor: 'transparent',
    height: 40,
    color: '#EFEFF4',
  },
  iconStyle: {
    marginLeft: 10,
    height: 45,
    width: 42.5,
    tintColor: '#EFEFF4',
  },
  carouselContainer: {
    width: width - 30,
  },
  locationHeaderText: {
    backgroundColor: 'transparent',
    color: '#EFEFF4',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  differentPlaceText: {
    backgroundColor: 'transparent',
    color: '#EFEFF4',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
    marginRight: 30
  },
  imageStyle: {
    alignSelf: 'center',
  }
};
export default SearchWorld;
