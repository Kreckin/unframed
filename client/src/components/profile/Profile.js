import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  TouchableHighlight,
  Switch } from 'react-native';
//import Switch from 'react-native-material-switch';
import userService from '../../lib/userService';
import Visited from '../../lib/totalSpotsVisited';
import FBLogIOButton from '../login/FBLogIOButton';


const { width, height } = Dimensions.get('window');

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          bounceValue: new Animated.Value(0),
          showAllSpots: false
        };
    }
    componentWillMount() {
      Visited(userService.currentUser.id).then((res) => {
        this.setState({
          visited: res.length
        });
      });
      this.setState({ showAllSpots: userService.currentUser.showAllSpots });
    }
    render(){
    return (
      <View style={styles.container}>
        <Image
          source={require('../../images/greenBackground.png')}
          style={styles.backgroundImage}
        >
        <Text style={styles.name}>{displayName.slice(0, displayName.indexOf(' '))}</Text>
        </Image>
      </View>

            
        );
    }
}


const styles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: height - 65,
  },
  backgroundImage: {
    height,
    width
  },
  name: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: '#EFEFF4',
    fontSize: 30,
  }
};


export default Profile;
