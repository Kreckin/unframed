import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

//This is a button with a camera icon. 
//It is currently 
//When you click it, it brings you to UploadPhotoContainer component where you can upload a new spot
const AddPhotoIcon = function () {
  return (
  	<View style={{ flex: 1}}>
        <TouchableHighlight
        onPress={() => Actions.UploadPhotoContainer()}
        >
			<Image
			style={styles.cameraIcon} 
			source={require('../icons/camera-big.png')}
			/>
        </TouchableHighlight>
       </View>
  );
};
const styles = {
	cameraIcon: {
		width: 30,
		height: 30,
		marginRight: 5,
		justifyContent: 'center',
		alignSelf: 'flex-end'
	}
};

export default AddPhotoIcon;
