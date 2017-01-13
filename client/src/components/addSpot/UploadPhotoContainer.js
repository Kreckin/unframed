import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Dimensions, Alert } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import CameraButtons from './CameraButtons';
import AddSpotInfo from './AddSpotInfo';
import Spinner from '../Spinner';
import NoLocationError from './NoLocationError';
import postSpot from '../../lib/postSpot';

const { width, height } = Dimensions.get('window');

const Platform = require('react-native').Platform; // do we need this separate?
const ImagePicker = require('react-native-image-picker');
// info: https://github.com/marcshilling/react-native-image-picker

const categories = [
    { key: 0, name: 'Street art', checked: false },
    { key: 1, name: 'Piece', checked: false },
    { key: 2, name: 'Tag', checked: false },
    { key: 3, name: 'Mural', checked: false },
    { key: 4, name: 'Installation', checked: false },
    { key: 5, name: 'Wheat paste', checked: false },
    { key: 6, name: 'Stencil', checked: false },
    { key: 7, name: 'Roller', checked: false },
    { key: 8, name: 'Character', checked: false },
    { key: 9, name: 'Sticker', checked: false },
    { key: 10, name: 'Other', checked: false }
    ];

export default class UploadPhotoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      image: null,
      title: '',
      description: '',
      categories: [],
      latitude: null,
      longitude: null,
    };
    this.takePhoto = this.takePhoto.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
    this.setImage = this.setImage.bind(this);
  }
  onSubmit() {
    if (!this.state.title) {
      Alert.alert(
    'Please add a title',
    [
      { text: 'OK' },
    ]
  );
    } else {
      this.setState({ loading: true });
      //we take everything we need for the postSpot function and pass it in as an object
      postSpot({ 
        title: this.state.title, 
        description: this.state.description, 
        categories: this.state.categories, 
        latitude: this.state.latitude, 
        longitude: this.state.longitude,
        uri: this.state.image.uri 
      }).then((spot) => {
        //set the states to null so we get a blank slate again
        this.setState({ title: '', description: '', image: null, categories: [] });
        categories.forEach((item) => item.checked = false);
        this.setState({loading: false});
        Actions.MapContainer({type: ActionConst.REFRESH, newLocation: { latitude: spot.latitude, longitude: spot.longitude} });
        });
    }
  }

  onTitleChange(title) {
    this.setState({ title });
  }
  onDescriptionChange(description) {
    this.setState({ description });
  }
  onCategoryChange(categories) {
    this.setState({ categories: categories });
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
      this.setState({ 
        image: source,
        latitude: response.latitude,
        longitude: response.longitude,
        loading: false 
      });
    }
  }
  takePhoto() {
    ImagePicker.launchCamera({ noData: true, allowsEditing: true }, (response) => {
      //this checks if your photo has geolocation data. If not, it takes your current location
      if (response.latitude === undefined || response.longitude === undefined) {
        navigator.geolocation.getCurrentPosition((position) => {
          response.latitude = position.coords.latitude;
          response.longitude = position.coords.longitude;
          this.setImage(response);
        });
      }
    });
 }
  backToAddPhoto() {
    this.setState({ image: '', loading: false });
  }
   chooseImage() {
    ImagePicker.launchImageLibrary({ noData: true }, (response) => {
      if (response.didCancel) {
        this.setState({
          loading: false,
        });
      } 
      else {
        this.setImage(response); 
      }
    });
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
      } else if (this.state.image && !this.state.longitude) {
        return (
          <NoLocationError 
            chooseImage={this.chooseImage.bind(this)} 
            takePhoto={this.takePhoto.bind(this)} 
          />
          );
      } else {
        return (
          <AddSpotInfo
            imageSource={this.state.image}
            onTitleChange={this.onTitleChange.bind(this)}
            title={this.state.title}
            onDescriptionChange={this.onDescriptionChange.bind(this)}
            description={this.state.description}
            onCategoryChange={this.onCategoryChange.bind(this)}
            category={categories}
            onSubmit={this.onSubmit.bind(this)}
            backToAddPhoto={this.backToAddPhoto.bind(this)}
            categories={this.state.categories}
          />
        );
      } 
    }
  render() {
    return (
      <View style={styles.body}>
      <StatusBar
        barStyle="light-content"
      />
        {this.renderButtonOrPic()}
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    flex: 1,
  },
});
