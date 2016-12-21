import React, { Component } from 'react';
import { View, Text, TextInput, Picker, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import postSpot from '../lib/postSpot';

class AddSpot extends Component {
    constructor(props) {
    super(props);
    this.state = {
        title: '',
        description: '',
        category: 'nature'
        };
    }
    onButtonPress() {
        //Add the 'file' and the long and lat later, besides that, it's all set up
        postSpot({ title: this.state.title, description: this.state.description, category: this.state.category });
        this.setState({ title: '', description: '' });
    }
    render() {
        return (
            <View>
                <View style={styles.topContainerStyle}>
                    <Text style={styles.labelStyle}>Title:</Text>
                    <TextInput 
                    style={styles.inputStyle}
                    label='title'
                    placeholder='Cool street art'
                    autocorrect={false}
                    value={this.state.title}
                    onChangeText={title => this.setState({ title })}
                    />
                    <Text style={styles.labelStyle}>Description:</Text>
                    <TextInput 
                    style={styles.inputStyle}
                    label='description'
                    value={this.state.description}
                    placeholder='A large painting on the side of a building'
                    onChangeText={description => this.setState({ description })}
                    autocorrect={false}
                    />
                </View>
                <Text style={styles.labelStyle}>Category:</Text>
                <Picker 
                    style={{ marginTop: -100 }}
                    selectedValue={this.state.category}
                    onValueChange={(category) => this.setState({ category })}
                >
                  <Picker.Item label="Nature" value="nature" />
                  <Picker.Item label="Street Art" value="street_art" />
                  <Picker.Item label="Holiday" value="holiday" />
                </Picker>
                <TouchableHighlight 
                    style={styles.buttonStyle}
                    onPress={this.onButtonPress.bind(this)}
                >
                    <Text style={{ fontSize: 18 }}>Submit</Text>
                </TouchableHighlight>
            </View>
      );
    }
}

const styles = {
  labelStyle: {
    fontSize: 18,
    paddingBottom: 30,
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

export default AddSpot;
