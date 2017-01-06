import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import SavedItem from './SavedItem';
import favorites from '../lib/favorites';

class SavedList extends Component {

  constructor() {
    super();
    this.state = { favorites: [] };
  }

  componentWillMount() {
    //favorites.add(1, 2);
    this.getSpots();
  }

  getSpots() {
    favorites.get('10207534965827573').then(favoritesArray => {
      this.setState({ favorites: favoritesArray });
      console.log('favoritesArray', favoritesArray);
    });
  }

  removeSavedSpot(id) {
    favorites.remove(1, id);
    //var index = this.state.favorites.indexOf()
    var newFavorites = this.state.favorites.filter(savedSpot =>
      savedSpot.id !== id);
    this.setState({ favorites: newFavorites });
  }

  render() {
    return (
      <View>
        <Text style={styles.titleStyle}>Saved Spots</Text>
        <ScrollView 
          style={styles.listStyle}
          contentContainerStyle={styles.listContainerStyle}
        >
          {this.state.favorites.map(spot => 
            <SavedItem
              key={spot.title}
              title={spot.title}
              description={spot.description}
              removeSavedSpot={this.removeSavedSpot.bind(this)}
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
  paddingTop: 10
 },
 listContainerStyle: {
 },
 titleStyle: {
  paddingTop: 42,
  fontSize: 30,
  alignSelf: 'center'
 }
};
export default SavedList;
