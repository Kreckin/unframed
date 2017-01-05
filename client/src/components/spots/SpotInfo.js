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
      //This state is here just for the time being to test the save functionality
      //Delete it once the lib functions are working
      //saved: this.props.user
      saved: true
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
      {/*Picture*/}
        <View style={styles.photoContainer}>
          <Image 
          source={require('../../icons/testGraffiti.jpg')}
          />
        </View>
        <View style={styles.infoContainer}>
      {/*Ratings*/}
          <View style={styles.ratingsContainer}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                //onPress={}
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
                //onPress={}
              >
                <Image
                  source={require('../../icons/star.png')}
                  style={styles.iconRating}
                />
              </TouchableHighlight>
              <Text style={styles.textRating}>{this.state.mehvotes}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                //onPress={}
              >
                <Image
                  source={require('../../icons/thumbsUp.png')}
                  style={styles.iconRating}
                />
              </TouchableHighlight>
              <Text style={styles.textRating}>{this.state.upvotes}</Text>
            </View>

          </View>
        </View>
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
  photoContainer: {
    backgroundColor: 'black',
    width,
    height: 300
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
};
export default SpotInfo;
