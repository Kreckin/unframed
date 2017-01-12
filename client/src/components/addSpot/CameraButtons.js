import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-looped-carousel';

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
      <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
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
          <TouchableOpacity style={styles.button} onPress={this.props.takePhoto}>
            <Text style={styles.buttonText}>Take a picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.props.chooseImage}>
            <Text style={styles.buttonText}>Choose from gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute', 
    top: height - 200, 
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#00B89C',
    width: 150,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    margin: 15
  },
  buttonText: {
    color: '#EFEFF4',
    fontSize: 18,
    textAlign: 'center'
  },
  imageStyle: {
    height,
    width,
    opacity: 0.6,
    resizeMode: 'cover'
  }
};

