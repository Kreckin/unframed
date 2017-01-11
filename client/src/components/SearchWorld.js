import React, {Component} from 'react';
import { View, Image, Dimensions, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-looped-carousel';

const { height, width } = Dimensions.get('window');

class SearchWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  }
  onIconSelect(){
    Actions.MapContainer({ ManualAddress:this.state.address });
    this.setState({ address: '' });
  }
  render(){
    return (
    <View>
      <StatusBar
        barStyle='light-content'
      />
      <View style={styles.navBar}>
        <Text style={styles.navBarText}>
          Go to a different location
        </Text>
      </View> 
      <Image source={require('../images/greenMap.png')} style={styles.backgroundPic}>
        <View style={styles.blackContainer}>
          <View style={styles.carouselContainer}>
            <Text style={styles.locationHeaderText}>Tap to select a location</Text>
            <Carousel style={{ height: 250, width: 350, alignSelf: 'center' }}>
              <Image
                style={styles.imageStyle}
                source={require('../images/london.png')}
              />
              <Image
                style={styles.imageStyle}
                source={require('../images/paris.png')}
              />
             <Image
                style={styles.imageStyle}
                source={require('../images/berlin.png')}
              />
            </Carousel>
          </View>
          
          <View style={{ }}>
            <Text style={styles.differentPlaceText}>Or choose somewhere else</Text>
            <View style={styles.searchContainer}>
              
              <View style={styles.inputView}>
                <TextInput 
                style={styles.textInputStyle}
                autoCapitalize={'sentences'}
                label='address'
                placeholder='  Type any address here'
                value={this.state.address}
                onChangeText={(address) => this.setState({address})}
                placeholderTextColor={'#EFEFF4'}
                selectionColor={'#006F60'}
                clearButtonMode={'while-editing'}
                />
              </View>
              <TouchableOpacity
                onPress={this.onIconSelect.bind(this)}
              >
                <Image
                  source={require('../icons/search.png')}
                  style={styles.iconStyle}
                />
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Image>
    </View>
    )
  }
};
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
    height: height - 130,
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
    width: width-80,
    borderColor: '#EFEFF4',
    marginBottom: 50,
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
    width: width-30,
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
  imageStyle:{
    alignSelf: 'center',
  }
};
export default SearchWorld;
