import config from './config.js';

const getVote = (userID, spotID) => {
    //sends a GET request to our server/user
  return fetch(`${config.apiUrl}/spots/voted/${userID}/${spotID}`)
    .then((relationship) => {
      return (relationship.json());
    })
    .catch((err) => {
      console.log('Error in get vote', err); 
      return (err);
    });
};


export default getVote;