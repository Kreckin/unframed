import React, { Component } from 'react';
import { View, TextInput, Image, TouchableOpacity, AlertIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';

//This is a button with a navigator icon. 
//When you click it, it refreshs the map icon page (thus bringing you home)
class LensIcon extends Component {
	constructor(props) {
		super(props);
		this.saveResponse = this.saveResponse.bind(this);
		this.state = {
      		promptValue: undefined,
    	};
    }

	render() {	
		return (
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<TouchableOpacity 
				onPress={() => AlertIOS.prompt('Type a value', null, this.saveResponse)}
				//onPress={this.props.handleManualAddressInput}
				>
					<Image
						style={styles.searchIcon} 
						source={require('../icons/search.png')}
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

// <TextInput
// 					style={styles.inputStyle}
// 					multiline
// 					onChangeText={this.props.onManualAddressChange}
// 					value={this.props.manualAddress}
// 				/>,
