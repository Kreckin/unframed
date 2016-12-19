import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';


const Blurb = (props) => {
  return (
    <View style={{ paddingTop: 65 }}>
        <Text style={styles.titleStyle}>{props.marker.title}</Text>
        <Image 
          style={styles.imageStyle}
          source={{ uri: 'https://staticdelivery.nexusmods.com/mods/1151/images/1917-0-1448130696.png' }} 
        />
        <Text style={styles.categoryStyle}>{props.marker.category}</Text>
        <TouchableHighlight 
          onPress={() => Actions.MapContainer()}
          style={styles.buttonStyle} 
        >
          <Text style={{ fontSize: 24 }}>Go back to map</Text>
        </TouchableHighlight>
    </View>
  );
};

styles = {
	titleStyle: {
    alignSelf: 'center',
    fontSize: 36,
    marginBottom: 5
	},
  categoryStyle: {
    alignSelf: 'center',
    fontSize: 22
  },
	imageStyle: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 4
  }, 
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: '#4286f4',
    padding: 4,
    borderRadius: 10
  }
};
export default Blurb;
