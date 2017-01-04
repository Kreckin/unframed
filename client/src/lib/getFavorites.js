import config from './config.js';
//this takes the userID from the user object
const getFavorites = (userID, callback) => {
  //sends a fetch request to the url with the ID
  fetch(`${config.apiUrl}/favorites/${userID}`)
    .then((response) => {
      return response.json();
    })
    //returns an array of objects that the user has favorited
    .then((data) => callback(data))
    .catch((err) => console.log('Error in get favorites', err));
};

export default getFavorites;
