import React, { Component } from 'react';
import {
  Text,
  View,
  ImagePickerIOS,
  CameraRoll,
  Image,
} from 'react-native';

export default class CameraRollPicker extends Component {
  constructor() {
    super();
    this.state = { image: null };
  }

  

  render() {
    return (
      <View>
      <CameraRoll />
      </View>
    );
  }
}