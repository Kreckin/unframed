import config from './config.js';

const addFavorites = (userID, spotID, callback) => {
  //fetch is fickle so I had to use this new Header thing-a-ma-jig
var myHeaders = new Headers();
//appened the content type we're sending up
myHeaders.append('Content-Type', 'application/json');
  //a postConfig object that tells the fetch function what to do
 const postConfig = {
    method: 'POST',
     headers: myHeaders,
    body: JSON.stringify({spotID:spotID,userID:userID}),
  };
  fetch(`${config.apiUrl}/favorites/add`, postConfig)
      .then((response) => {
      console.log(response);
    }).catch(error => console.log(error));
 };


export default addFavorites;
