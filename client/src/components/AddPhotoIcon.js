import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

//This is a button with a camera icon. 
//When you click it, it brings you to UploadPhotoContainer component where you can upload a new spot
const AddPhotoIcon = () => {
  return (
    <View style={{ paddingTop: 65, flex: 1 }}>
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
		marginTop: 5,
		marginRight: 5,
		alignSelf: 'flex-end'
	}
}
export default AddPhotoIcon;
