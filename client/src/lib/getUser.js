import config from './config.js';

const getUser = (id) => {
    //sends a GET request to our server/user
  return fetch(`${config.apiUrl}/users/${id}`)
    .then((user) => {
      return (user.json());
    })
    .catch((err) => {
      console.log('Error in get user', err); 
      return (err);
    });
};


export default getUser;
