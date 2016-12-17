import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';

const Icon = () => {
	const onClick = function () {
		console.log('click');
	};
  return (
    <View style={styles.view}>
    <TouchableHighlight onPress={onClick}>
		<Image
		style={styles.image}
		source={require('../icons/tree.png')}
		/>
		</TouchableHighlight>
    </View>
  );
};
const styles = {
	image: {
		height: 50,
		width: 50
	}, 
	view: {
		height: 52,
		width: 52
	}
};
export default Icon;
