import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';

const SearchAndFilter = () => {
  return (
    <View>
       <TextInput
			style={styles.inputStyle}
			multiline
			//onChangeText={this.props.onManualAddressChange}
			//value={this.props.manualAddress}
		/>
    </View>
  );
};
const styles = {
	inputStyle: {
		
		borderWidth: 1, 
		borderRadius: 2,
		borderColor: '#ccc', 
		padding: 10, 
		height: 35, 
		width: 150
	}
}
export default SearchAndFilter;