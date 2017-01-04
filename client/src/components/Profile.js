import React, { Component } from 'react';
import { View, Text } from 'react-native';

import FBButton from './FBLogIOButton';

const profile = () => {
  return (
    <View style={{ paddingTop: 65 }}>
        <Text>OMG This is totally a useless profile page</Text>
        <FBButton />
    </View>
  );
};

export default Profile;