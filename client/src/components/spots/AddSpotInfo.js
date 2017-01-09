import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, Dimensions, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

class AddSpotInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
    }
    render() {
        return (
            <View>
                <View style={styles.navBar} />
                <View style={styles.containerStyle}>
                    <Image
                        style={styles.imageStyle}
                        source={this.props.imageSource}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.labelStyle}>Title:</Text>
                        
                        <Text style={styles.requiredText}>{this.props.title === '' ? '  Required' : null}</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput 
                        style={styles.textInputStyle}
                        autocorrect={false}
                        autoCapitalize={'sentences'}
                        label='title'
                        placeholder='  Give a name to this artwork'
                        value={this.props.title}
                        onChangeText={this.props.onTitleChange}
                        placeholderTextColor={'gray'}
                        selectionColor={'#00B89C'}
                        clearButtonMode={'while-editing'}
                        />
                    </View>
                    <Text style={styles.labelStyle}>Description:</Text>
                    <View style={styles.inputView}>
                        <TextInput 
                        style={styles.textInputStyle}
                        label='description'
                        autocorrect={false}
                        placeholder='  Artist info, size, tips on locating...'
                        placeholderTextColor={'gray'}
                        selectionColor={'#00B89C'}
                        clearButtonMode={'while-editing'}
                        value={this.props.description}
                        onChangeText={this.props.onDescriptionChange}
                        />
                    </View>
                    <Text style={styles.labelStyle}>Categories:</Text>
                    <View style={styles.inputView}>
                        <TextInput 
                        style={styles.textInputStyle}
                        label='categories'
                        placeholder='  Tap to select categories'
                        placeholderTextColor={'gray'}
                        selectionColor={'#00B89C'}
                        />
                    </View>
                   
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableHighlight 
                        style={styles.buttonStyle}
                        onPress={this.props.backToAddPhoto}
                    >
                        <Text style={styles.buttonTextStyle}>Choose different picture</Text>
                    </TouchableHighlight>

                    <TouchableHighlight 
                        style={styles.buttonStyle}
                        onPress={this.props.onSubmit}
                    >
                        <Text style={styles.buttonTextStyle}>Submit</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
      );
    }
}

const styles = {
    containerStyle: {
        width, 
        backgroundColor: '#EFEFF4',
        paddingLeft: 15,
        paddingRight: 15,
        height: height - 130,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    navBar: {
        backgroundColor: '#006F60',
        height: 65,
        width
    },
    imageStyle: {
        marginTop: 5,
        height: 150,
        width: 150,
        alignSelf: 'center',
        borderWidth: 3
    },
    requiredText: {
        color: 'red',
        fontSize: 16,
        marginTop: 5
    },
    labelStyle: {
        fontSize: 24,
        color: '#006F60',
    },
    inputView: {
        borderBottomWidth: 2,
        borderColor: '#006F60',
        marginBottom: 5
    },
    textInputStyle: { 
        height: 40,
        color: '#006F60',
    },
    buttonStyle: {
        backgroundColor: 'gray',
        width: 150,
        borderRadius: 8,
        alignSelf: 'center',
      },
    buttonTextStyle: {
        color: '#EFEFF4',
        fontSize: 24,
        alignSelf: 'center'
    }
};

export default AddSpotInfo;
