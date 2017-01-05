import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

import FBButton from './login/FBLogIOButton';

const Profile = () => {
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
