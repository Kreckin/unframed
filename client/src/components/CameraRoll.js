import React, { Component } from 'react';
import { View, Image } from 'react-native';
import CameraButtons from './CameraButtons';
import AddSpot from './AddSpot';

const Platform = require('react-native').Platform;
const ImagePicker = require('react-native-image-picker');

export default class CameraRoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      title: '',
      description: '',
      category: 'nature',
      latitude: null,
      longitude: null
    };
    this.takePhoto = this.takePhoto.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.setImage = this.setImage.bind(this);
  }

  setImage(response) {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      //If it is iOS, remove 'file://' prefix
      let source = { uri: response.uri.replace('file://', ''), isStatic: true };

      //If android, don't need to remove the 'file://'' prefix
      if (Platform.OS === 'android') {
        source = { uri: response.uri, isStatic: true };
      }

      this.setState({ image: source });
    }
  }
  takePhoto() {
    ImagePicker.launchCamera({ noData: true }, this.setImage);
  }
  chooseImage() {
    ImagePicker.launchImageLibrary({ noData: true }, this.setImage);
  }
  renderButtonOrPic() {
    if (!this.state.image) {
      return (
        <CameraButtons chooseImage={this.chooseImage.bind(this)} takePhoto={this.takePhoto.bind(this)} />
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Image style={styles.image} source={this.state.image} />
          <AddSpot />
        </View>
      );
    }
  }
  render() {
    return (
      <View style={{ marginTop: 65, alignItems: 'center', flex: 1 }}>
        {this.renderButtonOrPic()}
      </View> 
    );
  }
}

const styles = {
  image: {
    //later look how to maintain the image's aspect ratio
    height: 165,
    //flex: 1,
    width: 165,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
