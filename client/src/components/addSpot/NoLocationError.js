import React from 'react';
import { View, Text, Image, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import Button from 'react-native-flat-button';

const { width, height } = Dimensions.get('window');

const NoLocationError = (props) => {
  return (
    <View>
      <View style={styles.background}>
       <StatusBar
        barStyle="light-content"
        />
      <View style={styles.middleContainer}>
        <Image 
          source={require('../../images/sadClown.png')}
          style={styles.imageStyle} 
        >
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}>
            <Text style={styles.text}>Sorry. </Text>
            <Text style={styles.text}>We can't accept this photo. </Text>
            <Text style={styles.text}>It doesn't have the geolocation data we need to ensure the accuracy of the app. </Text>
          </View>
        </Image>
        <Text style={styles.whyText}> Why not try a different photo? </Text>
      <View style={styles.buttonContainer} >
        <Button
          type="custom"
          backgroundColor={'#00B89C'}
          borderColor={'#008E7A'}
          onPress={props.takePhoto}
          borderRadius={6}
          shadowHeight={8}
          activeOpacity={0.5}
          containerStyle={styles.button}
          contentStyle={{ fontSize: 16, fontWeight: '500', textAlign: 'center' }}
        >
          Take a picture
        </Button>
        <Button
          type="custom"
          backgroundColor={'#00B89C'}
          borderColor={'#008E7A'}
          onPress={props.chooseImage}
          borderRadius={6}
          shadowHeight={8}
          activeOpacity={0.5}
          containerStyle={styles.button}
          contentStyle={{ fontSize: 16, fontWeight: '500', textAlign: 'center' }}
        >  
        Choose from gallery
          </Button>
        </View>
        </View>
      </View>
    </View>
  );
};
const styles = {
   background: {
    flex: 1,
    width,
    height: height - 65,
    backgroundColor: 'black',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  text: {
    fontSize: 18,
    color: '#EFEFF4',
    backgroundColor: 'rgba(0,0,0,0)',
    marginLeft: 15,
    marginRight: 15,
  },
  whyText: {
    fontSize: 22,
    color: '#EFEFF4',
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 25,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonText: {
    color: '#EFEFF4',
    fontSize: 18,
    textAlign: 'center'
  },
  imageStyle: {
    width,
    height: height * 2 / 5,
  },
  button: {
    width: width * 2 / 5,
    height: 60,
    margin: 20
  },
};
export default NoLocationError;
