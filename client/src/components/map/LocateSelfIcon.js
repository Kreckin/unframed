 import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';


//This is a button with a navigator icon. 
//When you click it, it refreshs the map icon page (thus bringing you home)
const LocateSelfIcon = function (props) {
  return (
	<View style={{ flex: 1 }}>
        <TouchableHighlight 
        onPress={props.selectLocatorIcon}
        >
			<Image
			style={styles.locatorIcon} 
			source={require('../../icons/locate-user.png')}
			/>
        </TouchableHighlight>
    </View>
  );
};
const styles = {
	locatorIcon: {
		marginLeft: 5,
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignSelf: 'flex-start'
	}
};

export default LocateSelfIcon;
