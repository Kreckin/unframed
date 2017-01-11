import React, {Component} from 'react';
import { View, Image, Dimensions, Text, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { height, width } = Dimensions.get('window');

class SearchWorld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  }
  onIconSelect(){
    Actions.MapContainer({ ManualAddress:this.state.address });
    this.setState({ address: '' });
  }
  render(){
    return (
    <View>
      <StatusBar
        barStyle='light-content'
      />
      <View style={styles.navBar}>
        <Text style={styles.navBarText}>
          Go to a different location
        </Text>
      </View>  
      <View style={styles.blackContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.inputView}>
            <TextInput 
            style={styles.textInputStyle}
            autoCapitalize={'sentences'}
            label='address'
            placeholder=' Type any address here'
            value={this.state.address}
            onChangeText={(address) => this.setState({address})}
            placeholderTextColor={'gray'}
            selectionColor={'#006F60'}
            clearButtonMode={'while-editing'}
            />
          </View>
          <TouchableOpacity
            onPress={this.onIconSelect.bind(this)}
          >
            <Image
              source={require('../icons/search.png')}
              style={styles.iconStyle}
            />
        </TouchableOpacity>
        </View>
      </View>
    </View>
    )
  }
};
const styles = {
  navBar: {
    width,
    backgroundColor: '#006F60',
    height: 65,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  navBarText: {
    color: '#EFEFF4',
    fontSize: 24,
    textAlign: 'center'
  },
  blackContainer: {
    paddingHorizontal: 20,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: height - 130,
    width
  },
  searchContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  inputView: {
    borderBottomWidth: 2,
    width: width-80,
    borderColor: '#EFEFF4',
    marginBottom: 5,
  },
  textInputStyle: { 
      height: 40,
      color: '#EFEFF4',
  },
  iconStyle: {
    marginLeft: 10,
    height: 45,
    width: 42.5,
    tintColor: '#EFEFF4',
  }
};
export default SearchWorld;
