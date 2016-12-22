import React, { Component } from 'react';
import { View, Text, TextInput, Picker, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

class AddSpotInfo extends Component {
    render() {
        return (
            <View>
                <View style={styles.topContainerStyle}>
                    <Text style={styles.labelStyle}>Title:</Text>
                    <TextInput 
                    style={styles.inputStyle}
                    label='title'
                    placeholder='Cool street art'
                    //autocorrect={false}
                    value={this.props.title}
                    onChangeText={this.props.onTitleChange}
                    />
                    <Text style={styles.labelStyle}>Description:</Text>
                    <TextInput 
                    style={styles.inputStyle}
                    label='description'
                    placeholder='A large painting on a dumpster'
                    value={this.props.description}
                    onChangeText={this.props.onDescriptionChange}
                    />
                </View>
                <Text style={styles.labelStyle}>Category:</Text>
                <Picker 
                    style={{ marginTop: -80 }}
                    selectedValue={this.props.category}
                    onValueChange={this.props.onCategoryChange}
                >
                  <Picker.Item label="Nature" value="nature" />
                  <Picker.Item label="Street Art" value="street_art" />
                  <Picker.Item label="Holiday" value="holiday" />
                </Picker>
                <TouchableHighlight 
                    style={styles.buttonStyle}
                    
                >
                    <Text style={{ fontSize: 20 }}>Submit</Text>
                </TouchableHighlight>
            </View>
      );
    }
}

const styles = {
  labelStyle: {
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 15,
    flex: 1,
    alignSelf: 'center'
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 5,
    width: 300,
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 2
  },
  containerStyle: {
    padding: 2,
    height: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  topContainerStyle: {
    height: 180, 
    marginLeft: 5,
    marginRight: 5
  },
  buttonStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    padding: 4,
    alignSelf: 'center',
    backgroundColor: '#007aff' 
  }
};

export default AddSpotInfo;
