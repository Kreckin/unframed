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
    }
    componentDidMount() {
        this.state.bounceValue.setValue(1.4);     // Start large
        Animated.spring(                          // Base: spring, decay, timing
          this.state.bounceValue,                 // Animate `bounceValue`
          {
            toValue: 1,                         // Animate to smaller size
            friction: 4,                          // Bouncier spring
          }
        ).start();                                // Start the animation
        this.setState({ showAllSpots: userService.currentUser.showAllSpots });
    }

    render() {
        const displayName = userService.currentUser.displayName || 'anon';
        // console.log('img url', userService.currentUser.profileUrl);

        return (
          <View>
            <View style={styles.body}>
                    <Animated.Image                         // Base: Image, Text, View
                        source={{ uri: userService.currentUser.profileUrl }}
                        style={{
                          transform: [                        // `transform` is an ordered array
                            { scale: this.state.bounceValue },  // Map `bounceValue` to `scale`
                          ],
                          marginTop: height * 0.05,
                          height: 155,
                          width: 155,
                          resizeMode: 'stretch',
                          borderRadius: 30,
                          borderColor: 'white',
                          borderWidth: 5,
                        }}
                    />
                <View style={styles.profileDetails} >
                    <Text style={styles.text}>Hello, { displayName.slice(0, displayName.indexOf(' ')) }</Text>
                    <Text style={styles.text}>visited, { this.state.visited }</Text>
                    <FBLogIOButton style={{marginRight: 'auto', marginLeft: 'auto'}} logoutCallback={this.props.logoutCallback} loginCallback={this.props.loginCallback} />
                </View>
             
            </View>
             <View>
                <Switch
                
                onValueChange={() => {
                  userService.changeShowSpots(userService.currentUser.id);
                  this.setState({showAllSpots: !this.state.showAllSpots });
                }}
                 value={this.state.showAllSpots}
                />
              </View>
          </View>
        );
    }
};

//                    <View style={styles.userDetails}>
//                      <TouchableHighlight style={styles.button}>
//                        <Text style={styles.text}>Votes</Text>
//                      </TouchableHighlight>
//                      <TouchableHighlight style={styles.button}>
//                        <Text style={styles.text}>Posts</Text>
//                      </TouchableHighlight>
//                      <TouchableHighlight style={styles.button}>
//                        <Text style={styles.text}>Spots Visited</Text>
//                      </TouchableHighlight>
//                      <TouchableHighlight style={styles.button}>
//                        <Text style={styles.text}>xyz</Text>
//                      </TouchableHighlight>
//                    </View>


const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#006F60',
    },
    profilePicture: {
        flex: 1
    },
    image: {
        marginTop: height * 0.05,
        // height: 200,
        // width: 200,
        resizeMode: 'cover',
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 5,
    },
    profileDetails: {
        marginTop: height * 0.02,
        flex: 4,
    },  
    text: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 28,
    },
    button: {
        // alignSelf: 'center',
        backgroundColor: '#EFEFF4',
        marginTop: height * 0.02,
        marginBottom: height * 0.02,
        width: 200,
        borderRadius: 50,
        borderWidth: 2,
    },
    userDetails: {
        marginTop: height * 0.02,
        flex: 1,
        flexDirection: 'column',
        marginBottom: 70,
    },
});

export default Profile;
