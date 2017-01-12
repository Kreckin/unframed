import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import Button from 'react-native-flat-button'

const { width, height } = Dimensions.get('window');

export default class CameraButtons extends Component {

  constructor(props) {
    super(props);

    this.state = {
      size: { width, height },
    };
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }

  render() {
    const carouselImages = [
            require('../../images/alley.jpg'),
            require('../../images/balloon.jpg'),
            require('../../images/dance.jpg'),
            require('../../images/dead.jpg'),
            require('../../images/heart.jpg'),
            require('../../images/icecream.jpg'),
            require('../../images/imagine.jpg'),
            require('../../images/rushmore.jpg'),
            require('../../images/skull.png'),
            require('../../images/tree.jpg'),
            require('../../images/water.jpg'),
    ];

    return (
      <View onLayout={this._onLayoutDidChange}>
        <Carousel
          delay={2000}
          style={this.state.size}
          autoplay
          //pageInfo
          // onAnimateNextPage={(p) => console.log(p)}
        >
          {
            carouselImages.map((image, idx) => (
              <View style={[{ backgroundColor: 'black' }, this.state.size]} key={idx}>
                <Image style={styles.imageStyle} source={image} />
              </View>
            ))
          }
        </Carousel>
        <View style={styles.buttonContainer}>
        <Button
          type="custom"
          backgroundColor={'#00B89C'}
          borderColor={'#006F60'}
          onPress={this.props.takePhoto}
          borderRadius={6}
          shadowHeight={8}
          activeOpacity={0.5}
          containerStyle={styles.button}
          contentStyle={{ fontSize: 18, fontWeight: '500', textAlign: 'center' }}
        >
          Take a picture
        </Button>
        <Button
          type="custom"
          backgroundColor={'#00B89C'}
          borderColor={'#006F60'}
          onPress={this.props.chooseImage}
          borderRadius={6}
          shadowHeight={8}
          activeOpacity={0.5}
          containerStyle={styles.button}
          contentStyle={{ fontSize: 18, fontWeight: '500', textAlign: 'center' }}
        >  
        Choose from gallery
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute', 
    top: height - 200, 
    flexDirection: 'row',
    width,
    justifyContent: 'center',
  },
  button: {
    width: width * 2 / 5,
    height: 60,
    margin: 20
  },
  imageStyle: {
    height,
    width,
    opacity: 0.6,
    resizeMode: 'cover'
  },
};

