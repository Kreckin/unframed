import config from './config.js';

//fetch is fickle so I had to use this new Header thing-a-ma-jig
const myHeaders = new Headers();
//append the content type we're sending up
myHeaders.append('Content-Type', 'application/json');

const favorites = {
  //for maximum confusion this will take the userID prop off the user object
    get: (userID, callback) => {
      return new Promise((resolve, reject) => {
      //sends a fetch request to the url with the ID
      fetch(`${config.apiUrl}/favorites/${userID}`)
        .then((response) => {
          return response.json();
        })
        //returns an array of objects that the user has favorited
        .then((data) => resolve(data))
        .catch((err) => reject('Error in get favorites', err));
      })
    },
    //this one takes the "node" id, or just like user.id, also spot.id NOT spot.spotid
    add: (userID, spotID) => {
      //a postConfig object that tells the fetch function what to do
      const postConfig = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ spotID: spotID, userID: userID }),
      };
      fetch(`${config.apiUrl}/favorites/add`, postConfig)
        .then((response) => {
          console.log(response);
        }).catch(error => console.log(error));
    },
    //this one takes the "node" id, or just like user.id, also spot.id NOT spot.spotid
    remove: (userID, spotID) => {
      //a postConfig object that tells the fetch function what to do
      const postConfig = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ spotID: spotID, userID: userID }),
      };
      fetch(`${config.apiUrl}/favorites/remove`, postConfig)
        .then((response) => {
          console.log(response);
        }).catch(error => console.log(error));
    }
  };
    
    export default favorites;
