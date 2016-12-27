import React, { Component } from 'react';
import { View, TextInput, Image } from 'react-native';

//This is a button with a navigator icon. 
//When you click it, it refreshs the map icon page (thus bringing you home)
class ManualLocationInput extends Component {
   constructor(props) {
    super(props);
    this.state = {
    	address: ''
    	};
	}

	render() {
		console.log(this.state.address);
		return (
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<TextInput
					style={styles.inputStyle}
					multiline={false}
					onChangeText={address => this.setState({address:address})}
					value={this.state.address}
				/>
				<Image
					style={styles.searchIcon} 
					source={require('../icons/search.png')}
				/>	
			</View>
		);
	}
}
const styles = {
	inputStyle: {
		alignSelf: 'flex-start', 
		borderWidth: 1, 
		borderRadius: 2,
		borderColor: '#ccc', 
		padding: 10, 
		height: 35, 
		width: 120
	},
	searchIcon: {
		marginTop: -80,
		height: 20,
		width: 20,
		alignSelf: 'flex-end'
	}
};

export default ManualLocationInput;
