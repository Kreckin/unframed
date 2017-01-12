import React, { Component } from 'react';
import { View, ScrollView, Text, StatusBar, Dimensions, TouchableHighlight } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import SavedItem from './SavedItem';
import favorites from '../../lib/favorites';
import userService from '../../lib/userService';

const { height } = Dimensions.get('window');

class SavedList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      sortFunction: this.distance,
      trianglePosition: 'this.distance'
    };
    this.recentOrPendingRequest = false;
    this.hasChildInViewStack = false;
  }

  componentWillMount() {
    this.getFavoriteSpots();
    this.recentOrPendingRequest = true;
  }

  getFavoriteSpots() {
    favorites.get(userService.currentUser.id)
      .then(favoritesArray => {
        this.setState({ 
          favorites: favoritesArray.sort(this.state.sortFunction)
        });
        setTimeout(() => {
          this.recentOrPendingRequest = false;
        }, 1000);
      })
      .catch(err => {
        console.log('error getting favorites in saved list:', err);
      });
  }

  removeSavedSpot(spotID) {
    favorites.remove(userService.currentUser.id, spotID);
    const newFavorites = this.state.favorites.filter(savedSpot =>
      savedSpot.id !== spotID);
    this.setState({ favorites: newFavorites });
  }

  orderBy(callback) {
    console.log("I got here with a callback of ", callback)
    this.setState({ trianglePosition: callback });
    if (this.state.sortFunction !== callback) {
      this.setState({ sortFunction: callback });

      //now sort the favorites array in state
      //var favorites = this.state.favorites.sort(callback)

      this.setState({ favorites: this.state.favorites.sort(callback) });
    }
  }

  highestRated(a, b) {
    if (a.percentage < b.percentage) return 1;
    return -1;
  }

  distance(a, b) {
    if (a.distance < b.distance) return -1;
    return 1;
  }

  recent(a, b) {
    if (b.added < a.added) return -1;
    return 1;
  }

  render() {
    if (!this.recentOrPendingRequest) {
      this.getFavoriteSpots();
      this.recentOrPendingRequest = true;
    }
    this.orderBy.bind(this);

    console.log(this.state.favorites);

    return (
      <View>
        <StatusBar barStyle='light-content' />
        <View style={styles.titleBarStyle}>
        <View style={styles.triangleRow}>
          <TouchableHighlight onPress={() => this.orderBy(this.distance)}>
            <Text style={styles.titleStyle}>Closest</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.orderBy(this.highestRated)}>
            <Text style={styles.titleStyle}>Highest Rated</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.orderBy(this.recent)}>
            <Text style={styles.titleStyle}>Recent</Text>
          </TouchableHighlight>
          </View>
          <View style={styles.triangleRow}>
            <View style={this.state.trianglePosition === 'this.distance' ? styles.triangle : null } />
            <View style={this.state.trianglePosition === 'this.highestRated' ? styles.triangle : null } />
          </View>
        </View>
        
     
        <ScrollView 
          style={styles.listStyle}
          contentContainerStyle={styles.listContainerStyle}
        >
          {
            // .sort( (a, b) => {
            //   if(a.distance < b.distance) return -1;
            //   else return 1;
            //   })
            this.state.favorites.map(spot => 
            <SavedItem
              key={spot.title}
              removeSavedSpot={this.removeSavedSpot.bind(this)}
              spot={spot}
              setSavedListState={this.props.setSavedListState}
              setCurrentView={this.props.setCurrentView}
            />)
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = {
 triangle: {
  height: 0, 
  width: 0, 
  borderLeftWidth: 15, 
  borderLeftColor: 'transparent',
  borderRightWidth: 15, 
  borderRightColor: 'transparent', 
  borderBottomWidth: 15, 
  borderBottomColor: '#EFEFF4',
  marginLeft: -30
 },
 triangleRow: {
  flexDirection: 'row',
  justifyContent: 'space-around'
 },
 listStyle: {
  paddingTop: 5,
  //height: 500,
  height: height - 120,
  backgroundColor: '#EFEFF4'
 },
 listContainerStyle: {
 },
 titleBarStyle: {
  //flexDirection: 'row',
  //justifyContent: 'space-around',
  backgroundColor: '#006F60',
  height: 100,
  paddingTop: 58,
  paddingLeft: 15
 },
 titleStyle: {
  fontSize: 18,
  alignSelf: 'center',
  color: '#EFEFF4'
 }
};
export default SavedList;
