//import ModalPicker from 'react-native-modal-picker';
import CheckBox from 'react-native-check-box';
import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
 
const { width } = Dimensions.get('window');

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
                style={{ flex: 1, padding: 10 }}
                onClick={() => {
                    data.checked = !data.checked;
                    this.props.onCategoryChange(this.props.category.filter((item) => item.checked ===true)
                        .map((item) => item = item.name));
                }}
                isChecked={data.checked}
                leftText={leftText}
            />);
    }
  render() {
    return (
        <View>
            
                {this.renderView()}
            
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
    checkbox: {
        width: 24,
        height: 24,
        marginRight: 5
    } 
  };
export default CategoryCheckbox;
