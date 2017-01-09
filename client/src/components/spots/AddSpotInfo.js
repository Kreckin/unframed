import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, Dimensions, Image } from 'react-native';
import CategoryCheckbox from './CategoryCheckbox';

const { width, height } = Dimensions.get('window');

class AddSpotInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={styles.viewStyle}>
                <Image
                    style={styles.imageStyle}
                    source={this.props.imageSource}
                />
                <Text style={styles.labelStyle}>Title</Text>
                <View style={styles.inputView}>
                    <TextInput 
                    style={styles.textInputStyle}
                    label='title'
                    placeholder='required'
                    //autocorrect={false}
                    value={this.props.title}
                    onChangeText={this.props.onTitleChange}
                    />
                </View>
                <Text style={styles.labelStyle}>Description</Text>
                <View style={styles.inputView}>
                    <TextInput 
                    style={styles.textInputStyle}
                    label='description'
                    placeholder='optional'
                    value={this.props.description}
                    onChangeText={this.props.onDescriptionChange}
                    />
                </View>
                <Text style={styles.labelStyle}>Categories:</Text>
                <View style={styles.inputView}>
                    <TextInput 
                    style={styles.textInputStyle}
                    label='categories'
                    placeholder='Tap to select'
                    //value={It was this.props.description, but Ethan will change this}
                    />
                </View>
               

                <TouchableHighlight 
                style={styles.buttonStyle}
                onPress={this.props.onSubmit}
                >
                    <Text style={styles.buttonTextStyle}>post art</Text>
                </TouchableHighlight>
            </View>
      );
    }
}

//ETHAN:
 //<CategoryCheckbox 
//     onCategoryChange={this.props.onCategoryChange} 
//     category={this.props.category}
// />

const styles = {
    viewStyle: {
        //flex: 1, 
        width, 
        backgroundColor: '#006F60',
        paddingLeft: 15,
        paddingRight: 15,
        height: height - 60
    },
    imageStyle: {
        height: 200,
        width: 200
    },
    labelStyle: {
        fontSize: 18,
        flex: 1,
        color: '#EFEFF4',
    },
    inputView: {
        borderBottomWidth: 2,
        borderColor: '#EFEFF4'
    },
    textInputStyle: {
        padding: 10, 
        height: 40,
        width: width - 30,
        color: '#006F60',
    },
    buttonStyle: {
        backgroundColor: 'gray',
        width: width * 0.5,
        height: 40,
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 50
      },
    buttonTextStyle: {
        color: '#EFEFF4',
        fontSize: 24,
        alignSelf: 'center'
    }
};

export default AddSpotInfo;
