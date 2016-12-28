import React, { Component } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';

//This is a button with a navigator icon. 
//When you click it, it refreshs the map icon page (thus bringing you home)
class ManualLocationInput extends Component {
	render() {	
		return (
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<TextInput
					style={styles.inputStyle}
					multiline
					onChangeText={this.props.onManualAddressChange}
					value={this.props.manualAddress}
				/>
				<TouchableOpacity 
				onPress={this.props.handleManualAddressInput}
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
	inputStyle: {
		marginLeft: -50,
		borderWidth: 1, 
		borderRadius: 2,
		borderColor: '#ccc', 
		padding: 10, 
		height: 35, 
		width: 150
	},
	searchIcon: {
		marginTop: 8,
		height: 20,
		width: 20,
		alignSelf: 'flex-end',
	}
};

export default ManualLocationInput;
