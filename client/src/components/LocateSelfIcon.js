import React from 'react';
import { View, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
const { height, width } = Dimensions.get('window');

//This is a button with a navigator icon. 
//When you click it, it refreshs the map icon page (thus bringing you home)
const LocateSelfIcon = function () {
  return (

        <TouchableHighlight 
        //Actions.refresh() refreshes the page you're on (mapcontainer) 
        //and therefore brings you back "home"
        onPress={() => Actions.refresh()}
        >
			<Image
			style={styles.locatorIcon} 
			source={require('../icons/locate-user.png')}
			/>
        </TouchableHighlight>

  );
};
const styles = {
	locatorIcon: {
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignSelf: 'flex-start'
	}
};

export default LocateSelfIcon;
