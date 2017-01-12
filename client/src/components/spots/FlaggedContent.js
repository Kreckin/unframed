import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';

const { height, width } = Dimensions.get('window');

const data = [{ name: "It's not street art", key: 1, checked: false }, 
{ name: "It's inappropriate", key: 2, checked: false },
{ name: "It's a duplicate", key: 3, checked: false }, 
{ name: "It's no longer there", key: 4, checked: false }];

class FlaggedContent extends Component {
 
  constructor() {
    super();
    this.state = {
      flaggedCategories: ''
    };
  }
  onSubmit() {
    //Need to write a function here to send us the photo and the category
    //sendToAppOwners(this.state.category, this.props.spot)
    Actions.MapContainer();
  }
  
  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navBar}>
          <Text style={styles.navBarText}>
          Why should "{this.props.spot.title}" be removed?
          </Text>
        </View>
        <View style={styles.containerStyle}>
        <Image
          source={require('../../images/monkey2.png')}
          style={styles.imageStyle}
        />
        { data.map((item) => {
          return(
            <View key={item.key}>
          <CheckBox
           style={styles.checkboxView}
           onClick={() => {
            item.checked = !item.checked;
            this.setState({flaggedCategories: (data.filter((item) => item.checked === true)
              .map((item) => item = item.name))
            });
          }}
           isChecked={item.checked}
           key={item.key}
           rightText={item.name}
           rightTextStyle={styles.checkboxText}
           checkedImage={<Image source={require('../../icons/check.png')} style={styles.checkboxIcon} />}
           unCheckedImage={<Image source={require('../../icons/unchecked.png')} style={styles.checkboxIcon} />}
          />
          </View>
          );
        })}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity 
          style={styles.button}
          onPress={Actions.pop}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={this.onSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }
}
const styles = {
  navBar: {
    backgroundColor: '#006F60',
    alignItems: 'center',
    //height: 65
  },
  navBarText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#EFEFF4',
    marginTop: 30,
    marginBottom: 12
  },
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#006F60',
    height
  },
  button: {
    backgroundColor: '#00B89C',
    width: 90,
    borderRadius: 5,
    margin: 10,
    alignSelf: 'center',
    marginBottom: 150
  },
  imageStyle: {
    height: height*2/5,
    width
  },
  buttonText: {
    color: '#EFEFF4',
    fontSize: 20,
    margin: 10,
    textAlign: 'center'
  },
  checkboxView: {
    flex: 1, 
    padding: 7, 
    backgroundColor: '#EFEFF4', 
    borderWidth: 2,
    borderColor: 'grey',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 6
  },
  checkboxText: {
    color: '#006F60',
    fontSize: 20,
    textAlign: 'left'
  },
  checkboxIcon: {
    tintColor: '#006F60',
    height: 18,
    width: 18
  }
};
export default FlaggedContent;

