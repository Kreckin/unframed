import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

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
			style={styles.image} 
			source={require('../icons/camera-big.png')}
			/>
        </TouchableHighlight>
    </View>
  );
};
const styles = {
	image: {
		width: 50,
		height: 50,
		marginRight: 10,
		alignSelf: 'flex-end'
	}
};

export default AddPhotoIcon;
