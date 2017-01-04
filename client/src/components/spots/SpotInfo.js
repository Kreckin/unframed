import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Votes from '../../lib/votes.js';

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
      downvotes: this.props.spot.downvotes
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
    Votes.mehVote('meh');
  }

  starClick() {
    this.setState({ saved: !this.state.saved });
    //if (saved){
      //saveThisItem() <- a lib function
    //} else {
      //unsaveThisItem() <- a lib function
    //}
  }
  render() {
    return (
      <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>
          {this.props.spot.title}
          </Text>
          <Image 
            style={styles.imageStyle}
            source={{ uri: `${this.props.spot.img_url}` }} 
          />

          <TouchableHighlight
            onPress={() => Actions.FlaggedContent({ title: this.props.spot.title})}
          >
            <Image
              style={styles.flagStyle}
              source={require('../../icons/flag.png')}
            />
          </TouchableHighlight> 

          <TouchableHighlight
            onPress={this.starClick.bind(this)}
          >
          {this.state.saved ? 
            <Image
              style={styles.starStyle}
              source={require('../../icons/star-outline.jpg')}
            />
              :
            <Image
              style={styles.starStyle}
              source={require('../../icons/star-fill.png')}
            />
          }
          </TouchableHighlight> 

          <Text style={styles.categoryStyle}>{this.props.spot.category}</Text>
          <Text style={styles.descriptionStyle}>
           
{this.props.spot.description ? this.props.spot.description : 'No description currently available'}
          </Text>
          <View>
              <Text style={styles.voteTotalStyle}>{ this.state.upvotes } upvotes</Text>
              <Text style={styles.voteTotalStyle}>{ this.state.downvotes } downvotes</Text>
          </View>
          <View style={styles.voteRowStyle}>
            <TouchableHighlight
              style={styles.downVoteStyle}
              onPress={this.downVote.bind(this)}
            >
              <Image
                style={styles.thumbImageStyle}
                source={require('../../icons/thumbsDown.png')}
              />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.mehVoteStyle}
              onPress={this.mehVote.bind(this)}
            >
              <Text>Meh</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.upVoteStyle}
              onPress={this.upVote.bind(this)}
            >
              <Image
                style={styles.thumbImageStyle}
                source={require('../../icons/thumbsUp.png')}
              />
            </TouchableHighlight>
          </View>
          <TouchableHighlight 
            onPress={() => Actions.MapContainer()}
            style={styles.buttonStyle} 
          >
            <Text>Back to map</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 34,
    marginBottom: 3,
    textAlign: 'center'
  },
  categoryStyle: {
    fontSize: 18,
    textAlign: 'center'
  },
  imageStyle: {
    height: 150,
    width: 150,
    borderWidth: 2,
    borderRadius: 4
  },
  descriptionStyle: {
    paddingRight: 20,
    paddingLeft: 20,
    height: 200,
    textAlign: 'center'
  }, 
  buttonStyle: {
    marginTop: 20,
    backgroundColor: '#4286f4',
    padding: 4,
    borderWidth: 2,
    borderRadius: 7
  },
  voteRowStyle: {
    flexDirection: 'row',
    width: 350,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-around'
  },
  downVoteStyle: {
    //marginTop: 3,
    backgroundColor: '#FF704D',
    //padding: 4,
    borderWidth: 2,
    borderRadius: 7,
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  upVoteStyle: {
    //marginTop: 3,
    backgroundColor: '#70db70',
    //padding: 4,
    borderWidth: 2,
    borderRadius: 7,
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center'  
  },
  mehVoteStyle: {
    //marginTop: 3,
    backgroundColor: 'grey',
    //padding: 4,
    borderWidth: 2,
    borderRadius: 7,
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center'  
  },
  thumbImageStyle: {
    height: 30,
    width: 30
  },
  voteTotalStyle: {
    //marginTop: 3,
    //padding: 4,
    //borderWidth: 2,
    //borderRadius: 7,
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 10
  },
  flagStyle: {
    height: 20,
    width: 20
  },
  starStyle: {
    height: 40,
    width: 40
  }
};

export default SpotInfo;
