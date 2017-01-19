import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions, StatusBar, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';
import Button from 'react-native-flat-button';

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
    return (
      <ScrollView style={{ flex: 1 }}>
        <StatusBar barStyle='light-content' />
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
          return (
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 40 }}>
          <Button
            type="custom"
            backgroundColor={'#00B89C'}
            borderColor={'#008E7A'}
            onPress={Actions.pop}
            borderRadius={6}
            shadowHeight={8}
            activeOpacity={0.5}
            containerStyle={styles.button}
            contentStyle={{ fontSize: 16, fontWeight: '500', textAlign: 'center' }}
          >  
            Back
          </Button>
          <Button
            type="custom"
            backgroundColor={'#00B89C'}
            borderColor={'#008E7A'}
            onPress={this.onSubmit}
            borderRadius={6}
            shadowHeight={8}
            activeOpacity={0.5}
            containerStyle={styles.button}
            contentStyle={{ fontSize: 16, fontWeight: '500', textAlign: 'center' }}
          >  
            Submit
          </Button>
        </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = {
  navBar: {
    backgroundColor: '#006F60',
    alignItems: 'center',
  },
  navBarText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#EFEFF4',
    marginTop: 30,
    marginBottom: 12,
    marginHorizontal: 10
  },
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#006F60',
    height: height - 120,
  },
  button: {
    width: width * 2 / 5,
    height: 40,
    margin: 20
  },
  imageStyle: {
    height: height / 3,
    width
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
    fontSize: 18,
    textAlign: 'left'
  },
  checkboxIcon: {
    tintColor: '#006F60',
    height: 18,
    width: 18
  }
};
export default FlaggedContent;

