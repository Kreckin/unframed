import { StyleSheet, Dimensions } from 'react-native';

 function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  }
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;
const slideWidth = wp(75);
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default StyleSheet.create({
    slider: {
        marginBottom: 35
    },
    sliderContainer: {
    },
    slide: {
        flexDirection: 'column',
        width: itemWidth,
        paddingHorizontal: itemHorizontalMargin
    }
});
