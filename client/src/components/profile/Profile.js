import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import userService from '../../lib/userService';
import FBButton from '../login/FBLogIOButton';

const Profile = (props) => {
    if (userService.currentUser.displayName) {
        const displayName = userService.currentUser.displayName;
        return (
            <View style={styles.body}>
            <Text>Hello { displayName.slice(0, displayName.indexOf(' ')) }</Text>
            <FBButton logoutCallback={props.logoutCallback}/>
            </View>
        );
    }
      return (
        <View style={styles.body}>
            <Text>User Profile goes here</Text>
            <FBButton />
        </View>
      );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Profile;
