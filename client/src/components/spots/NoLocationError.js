import React from 'react';
import { View, Text, Image, StatusBar, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const NoLocationError = (props) => {
  StatusBar.setBarStyle('light-content', true);
  return (
    <View style={styles.background}>
      <Text style={styles.text}>What up</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={props.takePhoto}>
            <Text style={styles.buttonText}>Take a picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={props.chooseImage}>
            <Text style={styles.buttonText}>Choose from gallery</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};
const styles = {
   background: {
    flex: 1,
    width,
    backgroundColor: '#2F2F2F',
    alignItems: 'center',
    height: 65
  },
  text: {
    fontSize: 20,
    color: '#EFEFF4'
  }
};
export default NoLocationError;
