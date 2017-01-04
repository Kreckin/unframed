import React, { Component } from 'react';
import { View, Image, TouchableOpacity, AlertIOS } from 'react-native';


//This is a button with a navigator icon. 
//When you click it, it refreshs the map icon page (thus bringing you home)
class LensIcon extends Component {
	render() {	
		return (
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<TouchableOpacity 
				onPress={() => AlertIOS.prompt(
					'Go to different location',
				  null,
				  [{ text: 'Cancel', style: 'cancel' },
				    { text: 'Search',
				      onPress: (text) => {
				        this.props.handleManualAddressInput(text)}
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
	}
}
const styles = {
	searchIcon: {
		marginTop: 8,
		height: 20,
		width: 20,
		alignSelf: 'flex-end',
	},
	inputStyle: {
		borderWidth: 1, 
		borderRadius: 2,
		borderColor: '#ccc', 
		padding: 10, 
		height: 35, 
		width: 150
	}
};

export default LensIcon;
