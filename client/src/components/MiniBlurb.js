import React, { Component } from 'react';
import {View, Text} from 'react-native';

const MiniBlurb = () => {
  return (
    <View style={styles}>
		<Text>Blurbity blurb</Text>
    </View>
  );
};

const styles = {
	zIndex: 2
};
export default MiniBlurb;
