import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Platform, StyleSheet } from 'react-native';

export default class HotLocation extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        illustration: PropTypes.string
    };
   

    render() {
      const { title, subtitle, illustration } = this.props;
        return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.slideInnerContainer}
              onPress={() => { console.log(`You've clicked '${title}'`); }}
            >
                <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: illustration }}
                      style={styles.image}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={2}>{ title.toUpperCase() }</Text>
                    <Text style={styles.subtitle} numberOfLines={2}>{ subtitle }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
 function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  }
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const slideHeight = viewportHeight * 0.4;

const sliderWidth = viewportWidth;
const itemHorizontalMargin = wp(2);

const entryBorderRadius = 6;


const styles = {
  slideInnerContainer: {
        height: slideHeight
    },
    imageContainer: {
        flex: 1,
        backgroundColor: 'gray',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    textContainer: {
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    title: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    subtitle: {
        marginTop: 6,
        color: 'gray',
        fontSize: 12,
        fontStyle: 'italic'
    }
};
