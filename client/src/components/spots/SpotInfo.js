//How to get the top part of this to lock without scrolling?
import React, { Component } from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  Image, 
  TouchableHighlight, 
  StatusBar, 
  Dimensions 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';

import Votes from '../../lib/votes.js';

const { height, width } = Dimensions.get('window');

class SpotInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //These states are here just for the time being to test the save functionality
      //Delete them once the lib functions are working and categories are up
      saved: true,
      categories: ['such art', 'the best', 'wooooow']
    };
  }

  componentWillMount() {
    //fetch the vote tally
    this.setState({
      upvotes: this.props.spot.upvotes,
      downvotes: this.props.spot.downvotes,
      mehvotes: this.props.spot.mehvotes
    });
    //checkIfSaved()
  }
  // Uncomment the above and below once the routes are up for saved
  // checkIfSaved() {
  //   let saved = false;
  //   const savedSpots = this.props.user.savedSpots;
  //   for (let i = 0; i < savedSpots.length; i++) {
  //     if (this.spot.spot_id === savedSpots[i]) {
  //       saved = true;
  //     }
  //   }
  //   this.setState({ saved });
  // }

  upVote() {
    Votes.upVote(this.props.spot.spot_id)
      .then((res) => {
        this.setState({ upvotes: res.upvotes });
    });
  }
  
  downVote() {
    Votes.downVote(this.props.spot.spot_id)
      .then((res) => {
        this.setState({ downvotes: res.downvotes });
    });
  }

  mehVote() {
    //TODO add server call 
    Votes.mehVote(this.props.spot.spot_id)
      .then((res) => {
        this.setState({ mehvotes: res.mehvotes });
    });
  }

  starClick() {
    this.setState({ saved: !this.state.saved });
    //if (saved){
      //saveThisItem() <- a lib function
    //} else {
      //unsaveThisItem() <- a lib function
    //}
  }
  //our toast function, which surprisingingly shows toasts
  toastAlert() {
    //this takes two params, the text to show and for how long to show it
    this.refs.toast.show('Come to this location to vote!', 2000);
  }
  render() {
      //we convert the distance we get from the spot to feet
       const feet = (parseFloat(this.props.spot.distance) * 3280.84);
       //this is an easy toggle but it checks if feet is greater than 1000
       //this is used later when determining the onClick events to use
       const disabled = feet > 1000;
    StatusBar.setBarStyle('light-content', true);
    return (
      <ScrollView >
    {/*Header*/}
        <View style={styles.headerView} scrollEnabled={false}>
          <Text style={styles.headerText}>{this.props.spot.title}</Text>
        </View>
      {/*Picture
      Note: there is a black background that is currently not in use because 
      I'm not sure how to style it based on image proportions
      */}
        <View style={styles.photoContainer}>
          <Image 
          source={{ uri: `${this.props.spot.img_url}` }} 
          style={styles.imageStyle}
          />
        </View>
        <View style={styles.infoContainer}>
      {/*Ratings*/}
          <View style={styles.ratingsContainer}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                onPress={disabled ? this.toastAlert.bind(this) : this.downVote.bind(this)}
              >
                <Image
                  source={require('../../icons/thumbsDown.png')}
                  style={styles.iconRating}
                />
              </TouchableHighlight>
              <Text style={styles.textRating}>{this.state.downvotes}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                onPress={!disabled ? this.toastAlert.bind(this) : this.mehVote.bind(this)}
              >
                <Image
                  source={require('../../icons/star.png')}
                  style={styles.iconRating}
                />
              </TouchableHighlight>
              <Text style={styles.textRating}>{this.state.mehvotes}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight
                onPress={disabled ? this.toastAlert.bind(this) : this.upVote.bind(this)}
              >
                <Image
                  source={require('../../icons/thumbsUp.png')}
                  style={styles.iconRating}
                />
              </TouchableHighlight>
              <Text style={styles.textRating}>{this.state.upvotes}</Text>
            </View>
          </View>
          {/*Distance*/}
          <Text style={styles.distanceStyle}>
          [Calculate later] feet away
          </Text>
          {/*Description*/}
          <Text style={styles.descriptionStyle}>
            {this.props.spot.description ? this.props.spot.description : 
              'No description currently available for this location'}
          </Text>
        {/*Categories*/}
        <View style={styles.categoryContainer}>

          {this.state.categories.map(category =>
              //This maps out all the dummy data categories into separate categories. 
              <View 
                key={category}
                style={styles.categoryViewStyle}
              > 
                <Text style={styles.categoryTextStyle}>{category}</Text>
              </View>
            )}
        </View>
        <View style={styles.saveFlagContainer}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight
              //onPress={}
            >
              <Image
                source={require('../../icons/star.png')}
                style={styles.iconRating}
              />
            </TouchableHighlight>
            <Text style={styles.textRating}>Save</Text>
          </View>

        </View>
        </View>
        <Toast
          ref="toast"
          style={{ backgroundColor: '#00B89C' }}
          position='top'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: 'black' }}
        />
      </ScrollView>
    );
  }
}
const styles = {
  headerView: {
    backgroundColor: '#00B89C',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 36,
    textAlign: 'center',
    color: '#EFEFF4',
    marginTop: 15,
    marginBottom: 5
  },
  //Change this to allow for varying photo types
  photoContainer: {
    backgroundColor: 'black',
    width,
    height: 300
  },
  //Also change this
  imageStyle: {
    height: null,
    flex: 1, 
    width,
  },
  infoContainer: {
    backgroundColor: '#006F60',
    width,
    height: 300
  },
  ratingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  iconRating: {
    height: 25,
    width: 25,
    tintColor: '#EFEFF4'
  },
  textRating: {
    paddingLeft: 10,
    color: '#EFEFF4'
  },
  distanceStyle: {
    color: '#EFEFF4',
    fontStyle: 'italic',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 24
  },
  descriptionStyle: {
    color: '#EFEFF4',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 18
  },
  categoryContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  categoryViewStyle: {
    backgroundColor: '#00B89C',
    padding: 5,
    borderRadius: 8,
  },
  categoryTextStyle: {
    color: '#EFEFF4',
    fontSize: 18,
    fontStyle: 'italic',
  },
  saveFlagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  saveFlagIcon: {
    height: 30,
    width: 30,
  }
};
export default SpotInfo;
