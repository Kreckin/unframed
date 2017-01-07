import React, { Component }  from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import FBLogIOButton from './FBLogIOButton';

const { width, height } = Dimensions.get('window');

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
          size: { width, height },
        };
    }
    render() {

        // even if we could pull these from the file system the bundler needs them exposed https://github.com/facebook/react-native/issues/2481
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
        const carouselText = [
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
        ];

        return (
        <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
            <Carousel
              delay={3000}
              style={this.state.size}
              autoplay
              //pageInfo
              // onAnimateNextPage={(p) => console.log(p)}
            >
              {
                carouselImages.map((src, idx) => (
                    <View style={[{ backgroundColor: 'black' }, this.state.size]} key={idx}>
                        <Image style={styles.imageStyle} source={src} >
                            <Text style={styles.headerText}>
                                    {carouselText[idx]}
                            </Text>
                        </Image>
                    </View>
                ))
              }
            </Carousel>
            
            <View style={styles.buttonContainer}>
                <View style={styles.body}>
                    <FBLogIOButton loginCallback={this.props.loginCallback} logoutCallback={this.props.logoutCallback} />
                </View>
            </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        // position: 'absolute', 
        fontSize: 52,
        top: height * 0.25,
        textAlign: 'center',
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        color: 'white',
        borderColor: '#eeeeee',
    },
    buttonContainer: {
        position: 'absolute', 
        top: height * 0.75, 
        flexDirection: 'row'
    },
    imageStyle: {
        height,
        width,
        opacity: 1,
        resizeMode: 'cover'
    }
});
