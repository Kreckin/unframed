import React, { Component } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';

class AddSpot extends Component {
 constructor(props) {
    super(props);
    this.state = {
        };
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
                />
                <Text style={styles.labelStyle}>Description:</Text>
                <TextInput 
                style={styles.inputStyle}
                label='description'
                placeholder='A large painting on the side of a building'
                autocorrect={false}
                numberOfLines={2}
                />
            </View>
            <Text style={styles.labelStyle}>Category:</Text>
            <Picker style={{marginTop: -80}}>
              <Picker.Item label="Nature" value="nature" />
              <Picker.Item label="Street Art" value="street_art" />
              <Picker.Item label="Holiday" value="holiday" />
            </Picker>
        </View>
              //selectedValue={this.state.language} onValueChange={(lang) => this.setState({ language: lang})}>
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
    marginTop: 65, 
    marginLeft: 5,
    marginRight: 5
  }
};

export default AddSpot;
