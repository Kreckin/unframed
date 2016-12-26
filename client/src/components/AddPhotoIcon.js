import React from 'react';
import { View, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

//This is a button with a camera icon. 
//It is currently 
//When you click it, it brings you to UploadPhotoContainer component where you can upload a new spot
const AddPhotoIcon = () => {
  return (
    <View style={{ paddingTop: 40, flex: 1 }}>
        <TouchableHighlight
        onPress={() => Actions.UploadPhotoContainer()}
        >
			<Image
			style={styles.cameraIcon} 
			source={require('../icons/camera-big.png')}
			/>
        </TouchableHighlight>
        <TouchableHighlight style={{ marginTop: height-180 }}
        //Need to check the style placement on this ^^ to make sure it works on other phones!!
        
        //Actions.refresh() refreshes the page you're on (mapcontainer) and therefore brings you back "home"
        onPress={() => Actions.refresh()}
        >
			<Image
			style={styles.locatorIcon} 
			source={require('../icons/locate-user.png')}
			/>
        </TouchableHighlight>
    </View>
  );
};
const styles = {
	cameraIcon: {
		width: 50,
		height: 50,
		marginRight: 10,
		alignSelf: 'flex-end'
	},
	locatorIcon: {
		width: 35,
		height: 35,
		//marginTop: 400,
		//marginRight: 10,
		alignSelf: 'flex-end'
	}
};

export default AddPhotoIcon;
