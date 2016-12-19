import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

const SavedList = () => {
  return (
    <View style={{ paddingTop: 65 }}>
        <Text>You can't see your saved things because you aren't logged in.</Text>
    </View>
  );
};

export default SavedList;
