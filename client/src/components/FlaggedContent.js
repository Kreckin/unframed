import React, { Component } from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import ModalPicker from 'react-native-modal-picker';

const { width } = Dimensions.get('window');

class FlaggedContent extends Component {
 
  constructor() {
    super();
    this.state = {
        category: ''
    };
  }
  render() {
      let index = 0;
      const data = [

          { key: index++, label: 'Nudity' },
          { key: index++, label: 'Profanity' },
          { key: index++, label: 'Copywritten' },
          { key: index++, label: 'Offensive' },
          { key: index++, label: 'Harmful to people or animals' },
          { key: index++, label: 'Other' },
      ];

    return (
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>You've flagged [name] as innappropriate.
        Please tell us how this picture breaks the rules. </Text>
        <ModalPicker
          data={data}
          initValue="Nature"
          onChange={(option) => { this.props.onCategoryChange(option.label)}}
        >    
        <TextInput
          style={styles.inputStyle}
          editable={false}
          placeholder="Click to select a category"
          value={this.props.category} 
        />
        </ModalPicker>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = {
    inputStyle: {
      alignSelf: 'center', 
      borderWidth: 1, 
      borderRadius: 2,
      borderColor: '#ccc', 
      padding: 10, 
      height: 40, 
      width: width - 30
    },
    viewStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textStyle: {
      textAlign: 'center',
      fontSize: 18,
      marginBottom: 15
    },
    button: {
      backgroundColor: 'gray',
      width: 120,
      height: 40,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      alignItems: 'center'
    }
  };
export default FlaggedContent;

