import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { height, width } = Dimensions.get('window');

class SpotInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numUpvotes: 25,
      numDownvotes: 5
    };
  }

  ComponentWillMount() {
    //fetch the vote tally
    //store in state
    //this.setState({ voteTally: 25 });
  }

  upVote() {
    console.log('Yay!');
  }
  downVote() {
    console.log('Booo!');
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={styles.cardStyle}>
          <Text style={styles.titleStyle}>
          {this.props.spot.title}
          </Text>
          <Image 
            style={styles.imageStyle}
            source={{ uri: `${this.props.spot.img_url}` }} 
          />
          <Text style={styles.categoryStyle}>{this.props.spot.category}</Text>
          <Text style={styles.descriptionStyle}>
            THIS IS SUCH A COOL SPOTTHIS IS SUCH A COOL SPOTTHIS IS SUCH A COOL
            SPOTTHIS IS SUCH A COOL SPOTTHIS IS SUCH A COOL SPOTTHIS IS SUCH A
            COOL SPOTTHIS IS SUCH A COOL SPOTTHIS IS SUCH A COOL SPOTTHIS IS S
            UCH A COOL SPOTTHIS IS SUCH A COOL SPOTTHIS IS SUCH A COOL SPOTTHI
            S IS SUCH A COOL SPOTTHIS IS SUCH A COOL SPOTTHIS IS SUCH A COOL SPOT
            POTTHIS IS SUCH A COOL SPOT</Text>
          <TouchableHighlight 
            onPress={() => Actions.MapContainer()}
            style={styles.buttonStyle} 
          >
            <Text>Back to map</Text>
          </TouchableHighlight>
          <View style={styles.voteRowStyle}>
            <TouchableHighlight
              style={styles.downVoteStyle}
              onPress={this.downVote}
            >
              <Image
                style={styles.thumbImageStyle}
                source={require('../buttonImages/thumbsDown.png')}
              />
            </TouchableHighlight>
            <View>
              <Text style={styles.voteTotalStyle}>{ this.state.numUpvotes + ' upvotes' }</Text>
              <Text style={styles.voteTotalStyle}>{ this.state.numDownvotes + ' downvotes' }</Text>
            </View>
            <TouchableHighlight
              style={styles.upVoteStyle}
              onPress={this.upVote}
            >
              <Image
                style={styles.thumbImageStyle}
                source={require('../buttonImages/thumbsUp.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 34,
    marginBottom: 3
  },
  categoryStyle: {
    fontSize: 18,
    alignSelf: 'center'
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
    height: 200
  }, 
  buttonStyle: {
    marginTop: 3,
    backgroundColor: '#4286f4',
    padding: 4,
    borderWidth: 2,
    borderRadius: 7
  },
  voteRowStyle: {
    flexDirection: 'row',
    width: 350,
    paddingTop: 20,
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
  thumbImageStyle: {
    height: 30,
    width: 30
  },
  voteTotalStyle: {
    //marginTop: 3,
    //padding: 4,
    //borderWidth: 2,
    //borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewStyle: {
    backgroundColor: 'rgba(255, 255, 255, .65)',
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStyle: {
    alignItems: 'center',
    backgroundColor: 'white',
  }
};
export default SpotInfo;
