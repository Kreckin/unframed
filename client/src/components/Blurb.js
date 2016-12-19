import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

const Blurb = (props) => {
  return (
    <View style={{ paddingTop: 65 }}>
        <Text onPress={() => Actions.MapContainer()}>I am some info about {props.marker.title}</Text>
    </View>
  );
};

export default Blurb;