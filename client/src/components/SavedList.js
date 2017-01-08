import React, { Component } from 'react';
import { View, ScrollView, Text, StatusBar, Dimensions } from 'react-native';
import SavedItem from './SavedItem';
import favorites from '../lib/favorites';
import userService from '../lib/userService';

const { height } = Dimensions.get('window');

class SavedList extends Component {

  constructor() {
    super();
    this.state = {
      favorites: [],
      displayOrder: 'recent'
    };
  }

  componentWillMount() {
    //favorites.add(1, 2);
    this.getSpots();
  }

  getSpots() {
    favorites.get(userService.currentUser.userID + '').then(favoritesArray => {
      this.setState({ favorites: favoritesArray });
      console.log('favoritesArray', favoritesArray);
    });
  }

  removeSavedSpot(id) {
    favorites.remove(userService.currentUser.id, id);
    var newFavorites = this.state.favorites.filter(savedSpot =>
      savedSpot.id !== id);
    this.setState({ favorites: newFavorites });
  }

  orderBy(attribute) {
    if(this.state.displayOrder !== attribute) {
      this.setState({ displayOrder: attribute });
    }
  }

  render() {
    return (
      <View>
        <StatusBar
          barStyle='light-content'
        />
        <View style={styles.titleBarStyle}>
          <Text style={styles.titleStyle} onPress={function () { this.orderBy('closest'); }}>Closest</Text>
          <Text style={styles.titleStyle} onPress={function () { this.orderBy('popular'); }}>Popular</Text>
          <Text style={styles.titleStyle} onPress={function () { this.orderBy('recent'); }}>Recent</Text>
        </View>
        <ScrollView 
          style={styles.listStyle}
          contentContainerStyle={styles.listContainerStyle}
        >
          { this.state.favorites.map(spot => 
            <SavedItem
              key={spot.title}
              title={spot.title}
              description={spot.description}
              img_url={spot.img_url}
              removeSavedSpot={this.removeSavedSpot.bind(this)}
              distance={spot.distance}
              id={spot.id}
            />)
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = {
 listStyle: {
  flex: 1,
  paddingTop: 5,
  //height: 500,
  height: height - 140,
  backgroundColor: '#EFEFF4'
 },
 listContainerStyle: {
 },
 titleBarStyle: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: '#006F60',
  height: 75
 },
 titleStyle: {
  paddingTop: 31,
  paddingBottom: 18,
  fontSize: 18,
  alignSelf: 'center',
  color: '#EFEFF4'
 }
};
export default SavedList;
