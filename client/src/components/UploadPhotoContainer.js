import React, { Component } from 'react';
import { View, Image } from 'react-native';
import CameraButtons from './CameraButtons';
import AddSpotInfo from './AddSpotInfo';
import Spinner from './Spinner';

import postSpot from '../lib/postSpot';

const Platform = require('react-native').Platform;
const ImagePicker = require('react-native-image-picker');

export default class UploadPhotoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
  onSubmit() {
    //we take everything we need for the postSpot function and pass it in as an object
    postSpot({ 
      title: this.state.title, 
      description: this.state.description, 
      category: this.state.category, 
      latitude: this.state.latitude, 
      longitude: this.state.longitude,
      uri: this.state.image.uri 
    });
    //set the states to null so we get a blank slate again
    this.setState({ title: '', description: '', image: null });
  }

  onTitleChange(title) {
    this.setState({ title });
  }
  onDescriptionChange(description) {
    this.setState({ description });
  }
  onCategoryChange(category) {
    this.setState({ category });
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
      this.setState({ image: source, latitude: response.latitude, longitude: response.longitude, loading: false });
    }
  }
  takePhoto() {
    ImagePicker.launchCamera({ noData: true }, this.setImage);
  }
  chooseImage() {
    ImagePicker.launchImageLibrary({ noData: true }, this.setImage);
     this.setState({ loading: true });
  }
  renderButtonOrPic() {
    if (!this.state.image && !this.state.loading) {
      return (
        <CameraButtons 
        chooseImage={this.chooseImage.bind(this)} 
        takePhoto={this.takePhoto.bind(this)} 
        />
      );
    } else if (this.state.loading) {
        return (
          <Spinner />
        );
      } else {
        return (
        <View style={{ flex: 1 }}>
          <Image style={styles.image} source={this.state.image} />
          <AddSpotInfo 
            onTitleChange={this.onTitleChange.bind(this)}
            title={this.state.title}
            onDescriptionChange={this.onDescriptionChange.bind(this)}
            description={this.state.description}  
            onCategoryChange={this.onCategoryChange.bind(this)}
            category={this.state.category}
            onSubmit={this.onSubmit.bind(this)}
          />
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
    marginTop: 10,
    height: 150,
    //flex: 1,
    width: 150,
    alignSelf: 'center',
    justifyContent: 'center',
  }
};
