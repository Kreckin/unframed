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
          <View style={styles.searchContainer}>
            <View style={styles.inputView}>
              <TextInput 
              style={styles.textInputStyle}
              autoCapitalize={'sentences'}
              label='address'
              placeholder=' Type any address here'
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
          <View>
            <Text style={styles.locationHeaderText}>Hot locations (tap to select)</Text>
            <Carousel style={{ alignSelf: 'center', height: 200, width: 200 }}>
            <View style={styles.hotSpotView}>
              <Text style={{color:'white', backgroundColor: 'transparent',}}>Hi</Text>
            </View>
            <View style={styles.hotSpotView}>
              <Text style={{color:'white', backgroundColor: 'transparent',}}>Hey</Text>
            </View>
            </Carousel>
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
    marginTop: 5,
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
    marginBottom: 5,
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
  locationHeaderText: {
    backgroundColor: 'transparent',
    color: '#EFEFF4',
    fontSize: 18,
    textAlign: 'center'
  },
  hotSpotView: {
    borderColor: '#EFEFF4',
    borderWidth: 3,
    borderRadius: 5,
    height: 100,
    width: 100,
    alignSelf: 'center'
  }
};
export default SearchWorld;
