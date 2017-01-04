import config from './config.js';

const getFavorites = (userID, callback) => {
    const getconfig = {
    method: 'GET',
    body: { userID: userID },
  };
  fetch(`${config.apiUrl}/favorites/${userID}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => callback(data))
    .catch((err) => console.log('Error in get favorites', err));
};

export default getFavorites;
