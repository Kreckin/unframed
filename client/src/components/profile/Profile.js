import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import userService from '../../lib/userService';
import FBButton from '../login/FBLogIOButton';

const { width, height } = Dimensions.get('window');

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          bounceValue: new Animated.Value(0),
        };
    }
    componentDidMount() {
      console.log('ppppppppp')
        this.state.bounceValue.setValue(1.4);     // Start large
        Animated.spring(                          // Base: spring, decay, timing
          this.state.bounceValue,                 // Animate `bounceValue`
          {
            toValue: 1,                         // Animate to smaller size
            friction: 4,                          // Bouncier spring
          }
        ).start();                                // Start the animation
    }
    componentWillUnmount() {
      console.log('unmounting!!');
    }
    render() {
      console.log('jjjjjjjj')
        const displayName = userService.currentUser.displayName || 'anon';
        // console.log('img url', userService.currentUser.profileUrl);

        return (
            <View style={styles.body}>
                    <Animated.Image                         // Base: Image, Text, View
                        source={{ uri: userService.currentUser.profileUrl }}
                        style={{
                          transform: [                        // `transform` is an ordered array
                            { scale: this.state.bounceValue },  // Map `bounceValue` to `scale`
                          ],
                          marginTop: height * 0.05,
                          height: 150,
                          width: 150,
                          resizeMode: 'stretch',
                          borderRadius: 50,
                        }}
                    />
                <View style={styles.profileDetails} >
                    <FBButton logoutCallback={this.props.logoutCallback} loginCallback={this.props.loginCallback} />
                    <View style={styles.userDetails}>
                      <Text>Votes</Text>
                      <Text>Posts</Text>
                      <Text>xyz</Text>
                    </View>
                </View>
            </View>
        );
    }
}
               // <View style={styles.profilePicture} >
               // </View>

                    // <Text style={styles.text}>Hello, { displayName.slice(0, displayName.indexOf(' ')) }</Text>

        // <Image source={{ uri: userService.currentUser.profileUrl }} style={styles.image} />

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
        borderRadius: 20
    },
    profileDetails: {
        marginTop: height * 0.02,
        flex: 4
    },  
    text: {
        alignSelf: 'center',
        color: '#EFEFF4',
        fontSize: 28
    },
    userDetails: {
      marginTop: height * 0.02,
      flex: 1,
      flexDirection: 'column',
      marginBottom: 70,
    },
});

export default Profile;
