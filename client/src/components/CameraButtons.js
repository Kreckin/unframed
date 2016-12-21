import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const CameraButtons = (props) => {
  return (
	<View style={styles.container}>
		<TouchableOpacity style={styles.button} onPress={props.takePhoto}>
			<Text style={styles.buttonText}>Take a picture</Text>
		</TouchableOpacity>
		<TouchableOpacity style={styles.button} onPress={props.chooseImage}>
			<Text style={styles.buttonText}>Gallery</Text>
		</TouchableOpacity>
    </View>
  );
};
const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'gray',
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  buttonText: {
    color: 'white'
  }
};
export default CameraButtons;
