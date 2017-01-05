import React from 'react';
import { View, Image, TouchableOpacity, AlertIOS } from 'react-native';


//This is a button with a navigator icon. 
//When you click it, it refreshs the map icon page (thus bringing you home)
const LensIcon = function (props) {
	return (
		<View style={{ flex: 1, flexDirection: 'row' }}>
			<TouchableOpacity 

				onPress={() => AlertIOS.prompt(
				'Go to different location',
			  	null,
			  	[{ text: 'Cancel', style: 'cancel' },
			    { text: 'Search',
			    	//onPress: (text) => {console.log(text)}
			      onPress: (text) => { props.handleManualAddressInput(text)}
			      	// Because this is no longer located in mapcontainer, the functionality is weird.
			      	// It's not working for the time being.
			        
			       //  console.log('WOW THIS DOESNT WORK ANYMORE BECAUSE YEAH')}
			    }],
			  'plain-text')}
			>
				<Image
					style={styles.searchIcon} 
					source={require('../../icons/search.png')}
				/>	
			</TouchableOpacity>	
		</View>
	);
};
const styles = {
	searchIcon: {
		height: 45,
		width: 42.5,
		marginLeft: 10,
		marginTop: 31
	}
};

export default LensIcon;
