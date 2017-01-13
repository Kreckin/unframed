import React, { Component } from 'react';
import { 
    View, 
    ScrollView,
    Text, 
    TextInput, 
    TouchableHighlight, 
    Dimensions, 
    Image, 
    StatusBar,
    KeyboardAvoidingView
    } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-simple-modal';
import Button from 'react-native-flat-button';
import CategoryCheckbox from './CategoryCheckbox';


const { width, height } = Dimensions.get('window');

class AddSpotInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            modalVisible: false,
        };
    }
    modalClose() {
        this.setState({ modalVisible: false });
    } 

    focusNextField(nextField) {
    this.refs[nextField].focus();
    }

    render() {
        return (
            <ScrollView>
            <StatusBar
                barStyle="default"
            />
                <View style={styles.containerStyle}>
                    <Image
                        style={styles.imageStyle}
                        source={this.props.imageSource}
                    />
                    <KeyboardAvoidingView>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.labelStyle}>Title:  </Text>
                        {this.props.title === '' ? <Text style={styles.requiredText}> Required </Text> : null}
                    </View>
                    <View style={styles.inputView}>
                        <TextInput 
                        style={styles.textInputStyle}
                        autocorrect={false}
                        autoCapitalize={'sentences'}
                        label='title'
                        ref='1'
                        placeholder='  Give a name to this artwork'
                        value={this.props.title}
                        onChangeText={this.props.onTitleChange}
                        placeholderTextColor={'gray'}
                        selectionColor={'black'}
                        clearButtonMode={'while-editing'}
                        onSubmitEditing={() => this.focusNextField('2')}
                        />
                    </View>
                    <Text style={styles.labelStyle}>Description:</Text>
                    <View style={styles.inputView}>
                        <TextInput 
                        style={styles.textInputStyle}
                        ref="2"
                        label='description'
                        autocorrect={false}
                        placeholder='  Artist info, size, tips on locating...'
                        placeholderTextColor={'gray'}
                        selectionColor={'black'}
                        clearButtonMode={'while-editing'}
                        value={this.props.description}
                        onChangeText={this.props.onDescriptionChange}
                        onSubmitEditing={() => this.setState({ modalVisible: true })}
                        />
                    </View>
                    <Text style={styles.labelStyle}>Categories:</Text>
                    <View style={styles.inputView}>
                        <TouchableHighlight
                        style={styles.modalButton}
                        onPress={() => this.setState({ modalVisible: true })}
                        >
                        {this.props.categories.length ? 
                        <Text style={styles.categoryTextStyle}>
                            {this.props.categories.join(', ')}
                        </Text>
                        :
                        <Text style={{ color: 'gray', fontSize: 18 }}>Tap to select categories</Text>
                    }
                      </TouchableHighlight>
                    </View>
                    </KeyboardAvoidingView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                    <Button
                      type="custom"
                      backgroundColor={'#00B89C'}
                      borderColor={'#008E7A'}
                      onPress={this.props.backToAddPhoto}
                      borderRadius={6}
                      shadowHeight={8}
                      activeOpacity={0.5}
                      containerStyle={styles.button}
                      contentStyle={{ fontSize: 16, fontWeight: '500', textAlign: 'center' }}
                    >  
                        Choose different picture
                    </Button>
                    <Button
                      type="custom"
                      backgroundColor={'#00B89C'}
                      borderColor={'#008E7A'}
                      onPress={this.props.onSubmit}
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
            <Modal
                open={this.state.modalVisible}
                modalDidClose={() => this.setState({ modalVisible: false })}
                style={{ alignItems: 'center' }}
            >
                 <CategoryCheckbox 
                    onCategoryChange={this.props.onCategoryChange} 
                    category={this.props.category}
                    modalClose={this.modalClose.bind(this)}
                 />
            </Modal>
        </ScrollView>
      );
    }
}

const styles = {
    modalContainer: {
        justifyContent: 'center',
        height,
    },
    containerStyle: {
        paddingTop: 30,
        width, 
        backgroundColor: '#EFEFF4',
        paddingLeft: 15,
        paddingRight: 15,
        height: height - 65,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    navBar: {
        backgroundColor: '#006F60',
        height: 65,
        width
    },
    imageStyle: {
        marginTop: 5,
        height: height / 4,
        width: height / 4,
        alignSelf: 'center',
        borderWidth: 3
    },
    requiredText: {
        color: 'red',
        fontSize: 16,
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'red',
        padding: 1,
        alignSelf: 'center',
        borderRadius: 2
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
        color: 'black',
    },
    categoryTextStyle: {
        fontSize: 16,
        marginLeft: -5
    },
    modalButton: {
        padding: 10,
        height: 40,
        width: width - 30,
    },
    button: {
        width: width * 2 / 5,
        height: 60,
        margin: 20
      },
};

export default AddSpotInfo;
