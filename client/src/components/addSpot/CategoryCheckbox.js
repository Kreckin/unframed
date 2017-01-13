import CheckBox from 'react-native-check-box';
import Button from 'react-native-flat-button';
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
                rightText={leftText}
                rightTextStyle={styles.checkboxText}
            />);
    }
  render() {
    return (
        <View style={styles.modalContainer}>
            
        {this.renderView()}
        <Button
            type="custom"
            backgroundColor={'#00B89C'}
            borderColor={'#008E7A'}
            onPress={this.props.modalClose}
            borderRadius={6}
            shadowHeight={8}
            activeOpacity={0.5}
            containerStyle={styles.button}
            contentStyle={{ fontSize: 16, fontWeight: '500', textAlign: 'center' }}
        >  
            Done
        </Button>
        </View>
    );
  }
}
const styles = {
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
        fontSize: 14,
        textAlign: 'left'
      },
     button: {
        width: width * 2 / 5,
        height: 40,
        margin: 20,
        alignSelf: 'center'
    },
  };
export default CategoryCheckbox;
