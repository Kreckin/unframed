import React from 'react';
import { View, Text, Image, StatusBar, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const NoLocationError = (props) => {
  StatusBar.setBarStyle('light-content', true);
  return (
    <View style={styles.background}>
      <View style={styles.navBar} />
      <Text style={styles.text}>Sorry. {'\n'} {'\n'}
      We can't accept this photo. {'\n'} {'\n'} {'\n'} {'\n'}
      It doesn't have the geolocation data we need to ensure the accuracy of the app.
      {'\n'} {'\n'} 
      Why not try a different photo?
      </Text>
      <View style={styles.buttonContainer} >
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
  navBar: {
    width,
    backgroundColor: '#006F60',
    height: 65
  },
   background: {
    flex: 1,
    width,
    backgroundColor: '#2F2F2F',
    alignItems: 'center',
    
  },
  text: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 20,
    color: '#EFEFF4'
  },
  buttonContainer: {
    top: height - 170, 
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#00B89C',
    width: 150,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    margin: 15
  },
  buttonText: {
    color: '#EFEFF4',
    fontSize: 18,
    textAlign: 'center'
  },
  imageStyle: {
    height,
    width,
    opacity: 0.6,
    resizeMode: 'cover'
  }
};
export default NoLocationError;
