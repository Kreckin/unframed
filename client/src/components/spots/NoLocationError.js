import React from 'react';
import { View, Text, Image, StatusBar, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const NoLocationError = (props) => {
  StatusBar.setBarStyle('light-content', true);
  return (
    <View>
      <View style={styles.navBar} />
      <View style={styles.background}>
      <View style={styles.middleContainer}>
        <Image 
          source={require('../../images/sadClown.png')}
          style={styles.imageStyle} 
        >
          <Text style={styles.text}>Sorry. {'\n'} {'\n'} {'\n'}
            We can't accept this photo. {'\n'} {'\n'} {'\n'}
            It doesn't have the geolocation data we need to ensure the accuracy of the app.
            {'\n'} {'\n'} {'\n'}
            Why not try a different photo?
          </Text>
        </Image>
        <View style={styles.textContainer}>
      </View>
      <View style={styles.buttonContainer} >
        <TouchableOpacity style={styles.button} onPress={props.takePhoto}>
          <Text style={styles.buttonText}>Take a picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={props.chooseImage}>
          <Text style={styles.buttonText}>Choose from gallery</Text>
        </TouchableOpacity>
        </View>
        </View>
      </View>
    </View>
  );
};
const styles = {
  navBar: {
    position: 'absolute',
    width,
    top: 0,
    backgroundColor: '#006F60',
    height: 65,
    zIndex: 2
  },
   background: {
    flex: 1,
    width,
    height: height - 65,
    backgroundColor: 'black',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  middleContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textContainer: {
    
  },
  text: {
    fontSize: 20,
    color: '#EFEFF4',
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 25,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonContainer: {
    position: 'absolute',
    top: height - 290, 
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
    width,
    height: height / 2,
  }
};
export default NoLocationError;
