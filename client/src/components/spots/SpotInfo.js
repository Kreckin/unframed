//How to get the top part of this to lock without scrolling?
import React, { Component } from 'react';
import { 
  View, 
  ScrollView, 
  Text, 
  Image, 
  StatusBar, 
  Dimensions 
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast, { DURATION } from 'react-native-easy-toast';
import Button from 'react-native-flat-button';

import Votes from '../../lib/votes.js';
import Visited from '../../lib/spotVisited.js';
import userService from '../../lib/userService';
import favorites from '../../lib/favorites';
import getVote from '../../lib/getVote'

const { width, height } = Dimensions.get('window');

class SpotInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: this.props.spot.upvotes,
      downvotes: this.props.spot.downvotes,
      mehvotes: this.props.spot.mehvotes,
      saved: false,
      vote: undefined
    };
  }

  componentWillMount() {
    // first see if user has visited spot before
    // (If they've voted, they've visited )
    Visited(userService.currentUser.id, this.props.spot.id)
     //then fetch vote tally
      .then((data) => {
        this.setState({visited: data.value,});
      })

    favorites.checkIfFavorite(userService.currentUser.id, this.props.spot.id)
       .then((response) => {
         if (response.length > 0) {
           this.setState({
             saved: true,
           });
         }
       })
       .catch((error) => {
         console.log('Error getting checkIfSavedSpot', error);
       });
    getVote(userService.currentUser.id, this.props.spot.id)
      .then((response) => {
        if (response.length > 0) {
          console.log('did we get in here?', response[0])
          this.setState({ vote: response[0].properties.voteType });
        }
      })
      .catch(error => console.log('error getting vote', error));
  }

  upVote() {
    Votes.upVote(userService.currentUser.id, this.props.spot.id)
      .then((res) => {
        this.setState({ upvotes: res.upvotes, 
                        downvotes: res.downvotes,
                        mehvotes: res.mehvotes,
                        vote: 'upvote'
                      });
    });
  }
  
  downVote() {
    Votes.downVote(userService.currentUser.id, this.props.spot.id)
      .then((res) => {
        this.setState({ upvotes: res.upvotes, 
                        downvotes: res.downvotes,
                        mehvotes: res.mehvotes,
                        vote: 'downvote'
                      });
    });
  }

  mehVote() {
    Votes.mehVote(userService.currentUser.id, this.props.spot.id)
      .then((res) => {
        this.setState({ upvotes: res.upvotes, 
                        downvotes: res.downvotes,
                        mehvotes: res.mehvotes,
                        vote: 'mehvote' 
                      });
    });
  }
  saveOrUnSaveSpot() {
    // check if already saved
    if (this.state.saved) {
      // unsave
      favorites.remove(userService.currentUser.id, this.props.spot.id)
        .then((resolve) => {
          // console.log('saveOrUnSaveSpot remove', resolve);
        })
        .catch((reject) => {
          console.log('saveOrUnSaveSpot remove', reject);
        });
    } else {
      //save
      favorites.add(userService.currentUser.id, this.props.spot.id)
        .then((resolve) => {
          // console.log('saveOrUnSaveSpot add', resolve);
        })
        .catch((reject) => {
          console.log('saveOrUnSaveSpot add', reject);
        });
    }
    this.setState({ saved: !this.state.saved });
  }
  renderCategories() {
    const categories = this.props.spot.categories;
    const block = [];
    for (let i = 0; i < categories.length; i += 4) {
      block.push(<View key={i} style={styles.categoryContainer}>
        {categories.slice(i, i + 4).map(category => 
          <View key={category} style={styles.categoryViewStyle}>
            <Text style={styles.categoryTextStyle}>{category}</Text>
          </View>
          )}
      </View>);
    }
    return block;
  }
  //our toast function, which surprisingly shows toasts
  toastAlert() {
    //this takes two params, the text to show and for how long to show it
    this.refs.toast.show('You must be within 1000 feet to vote and unlock this photo', 2000);
  }

  render() {
    const feet = this.props.spot.distance.toFixed(2);
    const noShow = !userService.currentUser.showAllSpots;
    const disabled = !this.state.visited && ((feet * 5280) > 1000);
    const vote = this.state.vote;
    return (
      <ScrollView >
      {/*Header*/}
        <View style={styles.headerView}>
         <StatusBar
            barStyle='light-content'
          />
          <Text style={styles.headerText} numberOfLines={1}>
            {this.props.spot.title}
          </Text>
        </View>
      {/*Picture
      Note: there is a black background that is currently not in use because 
      I'm not sure how to style it based on image proportions
      */}
        <View style={styles.photoContainer}>
          <Image 
          source={{ uri: `${this.props.spot.img_url}` }} 
          style={styles.imageStyle}
          blurRadius={(disabled && noShow) ? 10 : 0}
          >
          {(disabled && noShow) ? <Image source={require('../../icons/Lock.png')}
          style={styles.lockStyle} 
          /> : null}
          </Image>
        </View>
        <View style={styles.infoContainer}>
      {/*Ratings*/}
          <View style={styles.ratingsContainer}>

             {/*Flag*/}
              <Button
                type="custom"
                backgroundColor={'#00B89C'}
                borderColor={'#008E7A'}
                onPress={() => Actions.FlaggedContent({ spot: this.props.spot })}
                borderRadius={0}
                shadowHeight={8}
                activeOpacity={0}
                containerStyle={styles.bottomButton}
                contentStyle={{ fontSize: 18, fontWeight: '500', textAlign: 'center' }}
              >

                <Image
                    source={require('../../icons/flag.png')}
                    style={styles.FlagIcon}
                />  
              </Button>
              {/*downvotes*/}
            <View style={{ flexDirection: 'row' }}>
              <Button
                type="custom"
                
                borderColor={'#008E7A'}
                onPress={disabled ? this.toastAlert.bind(this) : this.downVote.bind(this)}
                borderRadius={6}
                shadowHeight={8}
                activeOpacity={0.5}
                containerStyle={vote === 'downvote' ?  styles.disabledButton: styles.button}
                contentStyle={{ fontSize: 18, fontWeight: '500', textAlign: 'center' }}
              >
              <Image
                  source={require('../../icons/sad.png')}
                  style={styles.iconRating}
              />
              {'   ' + this.state.downvotes}    
            </Button>
          </View>
          {/*mehvotes*/}
             <View style={{ flexDirection: 'row' }}>
              <Button
                type="custom"
                backgroundColor={'#00B89C'}
                borderColor={'#008E7A'}
                onPress={disabled ? this.toastAlert.bind(this) : this.mehVote.bind(this)}
                borderRadius={6}
                shadowHeight={8}
                activeOpacity={0.5}
                containerStyle={vote === 'mehvote' ?  styles.disabledButton: styles.button}
                contentStyle={{ fontSize: 18, fontWeight: '500', textAlign: 'center' }}
              >
              <Image
                  source={require('../../icons/meh.png')}
                  style={styles.iconRating}
              />
              {'   ' + this.state.mehvotes}
            </Button>
          </View>
          {/*upvotes*/}
            <View style={{ flexDirection: 'row' }}>
              <Button
                type="custom"
                backgroundColor={'#00B89C'}
                borderColor={'#008E7A'}
                onPress={disabled ? this.toastAlert.bind(this) : this.upVote.bind(this)}
                borderRadius={6}
                shadowHeight={8}
                activeOpacity={0.5}
                containerStyle={vote === 'upvote' ?  styles.disabledButton: styles.button}
                contentStyle={{ fontSize: 18, fontWeight: '500', textAlign: 'center' }}
              >

                <Image
                    source={require('../../icons/happy.png')}
                    style={styles.iconRating}
                />
                {'   ' + this.state.upvotes}    
              </Button>
              </View>
               {/*Save*/}
              <Button
                type="custom"
                backgroundColor={'#00B89C'}
                borderColor={'#008E7A'}
                onPress={this.saveOrUnSaveSpot.bind(this)}
                borderRadius={6}
                shadowHeight={8}
                activeOpacity={0.5}
                containerStyle={this.state.saved ? styles.disabledBottomButton : styles.bottomButton}
                contentStyle={{ fontSize: 18, fontWeight: '500', textAlign: 'center' }}
              >
                <Image
                    source={require('../../icons/star.png')}
                    style={styles.saveIcon}
                />   
              </Button>
            </View>
          {/*Distance*/}
          <Text style={styles.distanceStyle}>
          Currently {feet} miles away
          </Text>
          {/*Description*/}
          <Text style={styles.descriptionStyle}>
            {this.props.spot.description ? this.props.spot.description : 
              'No description currently available for this location'}
          </Text>
        {/*Categories*/}
        {this.renderCategories()}
          <View style={{ height: 200, width, backgroundColor: '#006F60' }}/>
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
    backgroundColor: '#006F60',
    alignItems: 'center',
    height: 65
  },
  headerText: {
    fontSize: 34,
    textAlign: 'center',
    color: '#EFEFF4',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 20,
    width: width - 50
  },
  //Change this to allow for varying photo types
  photoContainer: {
    backgroundColor: 'black',
    width,
    height: height * 2 / 5
  },
  //Also change this
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'space-around',
    width,
    paddingTop: 10,
    marginRight: 5
  },
  iconRating: {
    height: 33,
    width: 30,
    tintColor: '#EFEFF4',
    marginTop: 3
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
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  categoryViewStyle: {
    backgroundColor: '#EFEFF4',
    padding: 6,
    borderRadius: 8,
    margin: 5
  },
  categoryTextStyle: {
    color: '#006F60',
    fontSize: 18,
    fontStyle: 'italic',
  },
  saveIcon: {
    height: 25,
    width: 25,
    tintColor: '#EFEFF4',
  },
  FlagIcon: {
    height: 25,
    width: 20,
    tintColor: '#EFEFF4',
  },
  button: {
    width: width / 5,
    height: 45,
    marginHorizontal: 8,
    backgroundColor: '#00B89C'
  },
  bottomButton: {
    width: width / 9,
    height: 45,
    marginHorizontal: 8,
    backgroundColor: '#00B89C'
  },
  disabledButton: {
   backgroundColor: '#008E7A',
   width: width / 5,
   height: 45,
   marginHorizontal: 8
  },
  disabledBottomButton: {
    width: width / 9, 
    height: 45,
    marginHorizontal: 8,
    backgroundColor: '#008E7A'
  }
};
export default SpotInfo;
