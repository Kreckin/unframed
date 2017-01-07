import React, { Component } from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');

class FlaggedContent extends Component {
 
  constructor() {
    super();
    this.state = {
        category: ''
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navBar}>
          <Text style={styles.navBarText}>
          Why should "{this.props.spotTitle}" be removed?
          </Text>
        </View>
        <View style={styles.containerStyle}>
        
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = {
  
    button: {
      backgroundColor: 'gray',
      width: 120,
      height: 40,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      alignItems: 'center'
    }
  };
export default FlaggedContent;

