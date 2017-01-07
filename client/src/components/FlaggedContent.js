import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { height, width } = Dimensions.get('window');

class FlaggedContent extends Component {
 
  constructor() {
    super();
    this.state = {
        category: ''
    };
  }
  onSubmit() {
    //this is where we send out the thing to be taken down
    Actions.MapContainer();
  }
  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navBar}>
          <Text style={styles.navBarText}>
          Why should "{this.props.spotTitle}" be removed?
          </Text>
        </View>
        <View style={styles.containerStyle}>
        <Image
          source={require('../images/monkey2.png')}
          style={styles.imageStyle}
        />
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = {
  navBar: {
    backgroundColor: '#006F60',
    alignItems: 'center',
    //height: 65
  },
  navBarText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#EFEFF4',
    marginTop: 30,
    marginBottom: 12
  },
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#006F60',
    height
  },
  button: {
    backgroundColor: '#00B89C',
    width: 90,
    borderRadius: 5,
    margin: 10,
    alignSelf: 'center',
    marginBottom: 150
  },
  imageStyle: {
    height: height*2/5,
    width
  },
  buttonText: {
    color: '#EFEFF4',
    fontSize: 20,
    margin: 10,
    textAlign: 'center'
  }
};
export default FlaggedContent;

