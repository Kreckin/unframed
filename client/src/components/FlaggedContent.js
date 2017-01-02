import React, { Component } from 'react';
import { View, Text, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import ModalPicker from 'react-native-modal-picker';
import { Actions } from 'react-native-router-flux';

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
        <Text style={styles.textStyle}>You've flagged "{this.props.title}" as innappropriate.
        Please tell us how this post breaks the rules. </Text>
        <ModalPicker
          data={data}
          onChange={(option) => { this.setState({ category: option.label })}}
        >    
        <TextInput
          style={styles.inputStyle}
          editable={false}
          placeholder="Click to select a category"
          value={this.state.category} 
        />
        </ModalPicker>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => Actions.pop()}
        >
          <Text style={styles.buttonText}>Back</Text>
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

