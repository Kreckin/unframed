import ModalPicker from 'react-native-modal-picker';
import React, { Component } from 'react';
import { View, TextInput, Dimensions } from 'react-native';
 
const { width } = Dimensions.get('window');

class CategoryModal extends Component {
 
    constructor() {
        super();
 
        this.state = {
            textInputValue: ''
        };
    }
 
    render() {
        let index = 0;
        const data = [
            //Later, if we want to use
            //{ key: index++, section: true, label: 'Outdoors' },
            { key: index++, label: 'Nature' },
            { key: index++, label: 'Street art' },
            { key: index++, label: 'Holiday' },
        ];
 
        return (
            <View style={{ flex: 1 }}>

                <ModalPicker
                    data={data}
                    initValue="Nature"
                    onChange={(option) => { this.props.onCategoryChange(option.label)}}
                >
                    
                    <TextInput
                        style={styles.inputStyle}
                        editable={false}
                        placeholder="Click to select your category"
                        value={this.props.category} 
                    />
                </ModalPicker>
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
  };
export default CategoryModal;
