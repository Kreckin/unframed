import config from './config.js';

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    //sends a GET request to our server/user
  fetch(`${config.apiUrl}/users/${id}`)
    .then((user) => {
      resolve(user.json());
    })
    .catch((err) => {
      console.log('Error in get user', err); 
      reject(err);
    });
  });
};

export default getUser;
