import React from 'react';
import { View, TextInput, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');
//This is a button with a navigator icon. 
//When you click it, it refreshs the map icon page (thus bringing you home)
const ManualLocationInput = function () {
  return (
	<View style={{ flex: 1, flexDirection: 'row' }}>
        <TextInput
			style={styles.inputStyle}
			multiline={false}
        />
        <Image
			style={styles.searchIcon} 
			source={require('../icons/search.png')}
			/>	

    </View>
  );
};
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
