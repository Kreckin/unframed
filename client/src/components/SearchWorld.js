import React, {Component} from 'react';
import { View, Image, Dimensions, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';

import HotLocation from './HotLocation';

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
   _renderItem (entry) {
    return (
        <HotLocation {...entry} />
    );
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
            <Carousel
              items={entries}
              firstItem={2}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.6}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              slideStyle={styles.slide}
              containerCustomStyle={{ marginBottom: 35 }}
              //contentContainerCustomStyle={sliderStyles.sliderContainer}
              showsHorizontalScrollIndicator={false}
              snapOnAndroid={true}
              removeClippedSubviews={false}
            />
          </View>
        </View>
      </Image>
    </View>
    )
  }
};
const entries = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'http://i.imgur.com/UYiroysl.jpg'
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'http://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'http://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        title: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/lceHsT6l.jpg'
    }
    ]
 function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  }
const itemWidth = slideWidth + itemHorizontalMargin * 2;
const slideWidth = wp(75);
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
    fontSize: 26,
    textAlign: 'center'
  },
  hotSpotView: {
    borderColor: '#EFEFF4',
    borderWidth: 3,
    borderRadius: 5,
    height: 250,
    width: 250,
    alignSelf: 'center'
  },
  slide: {
    flexDirection: 'column',
    width: itemWidth,
    paddingHorizontal: itemHorizontalMargin
  }
};
export default SearchWorld;
