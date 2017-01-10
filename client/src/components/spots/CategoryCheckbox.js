//import ModalPicker from 'react-native-modal-picker';
import CheckBox from 'react-native-check-box';
import React, { Component } from 'react';
import { View, Dimensions, Image, TouchableHighlight, Text } from 'react-native';
 
const { width, height } = Dimensions.get('window');

class CategoryCheckbox extends Component {

     renderView() {
        if (!this.props.category || this.props.category.length === 0) return;
        const len = this.props.category.length;
        const views = [];
        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.props.category[i])}
                        {this.renderCheckBox(this.props.category[i + 1])}
                    </View>
                    <View style={styles.line} />
                </View>
            );
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.props.category[len - 2]) : null}
                    {this.renderCheckBox(this.props.category[len - 1])}
                </View>
            </View>
        );
        return views;
    }
        renderCheckBox(data) {
        const leftText = data.name;
        return (
            <CheckBox
                style={styles.checkboxView}
                onClick={() => {
                    data.checked = !data.checked;
                    this.props.onCategoryChange(this.props.category.filter((item) => item.checked ===true)
                        .map((item) => item = item.name));
                }}
                checkedImage={<Image source={require('../../icons/check.png')} style={styles.checkboxIcon} />}
                unCheckedImage={<Image source={require('../../icons/unchecked.png')} style={styles.checkboxIcon} />}
                isChecked={data.checked}
                leftText={leftText}
                rightTextStyle={styles.checkboxText}
            />);
    }
  render() {
    return (
        <View style={styles.modalContainer}>
            
        {this.renderView()}
                <TouchableHighlight 
                    style={styles.buttonStyle}
                    onPress={this.props.modalClose}
                >
                    <Text style={styles.buttonTextStyle}>Done</Text>
                </TouchableHighlight>
            
        </View>
    );
  }
}
const styles = {
    modalContainer: {
        justifyContent: 'center',
        height: height,
        backgroundColor: 'black',

    },
     item: {
        flexDirection: 'row',
    },
    inputStyle: {
        alignSelf: 'center', 
        borderWidth: 1, 
        borderRadius: 2,
        borderColor: '#ccc', 
        padding: 10, 
        height: 40, 
        width: width - 30
      },
    row: { 
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: '#ffffff'
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
    checkboxIcon: {
        tintColor: '#006F60',
        height: 18,
        width: 18
  },
    checkboxText: {
        color: '#006F60',
        fontSize: 20,
        textAlign: 'left'
  },
    buttonTextStyle: {
        color: '#EFEFF4',
        fontSize: 24,
        alignSelf: 'center'
    },
    buttonStyle: {
        backgroundColor: 'gray',
        width: 150,
        borderRadius: 8,
        alignSelf: 'center',
      },
  };
export default CategoryCheckbox;
