import config from './config.js';

const tree = require('../icons/tree-small.png');
const spraycan = require('../icons/spraycan-small.png');
const wreath = require('../icons/wreath-small.png');

const getSpots = (lat, lon, distance) => {
  return new Promise((resolve, reject) => {
    //sends a GET request to our server/spots
  fetch(`${config.apiUrl}/spots?lat=${lat}&lon=${lon}&distance=${distance}`)
    .then((response) => {
      //with fetch we gotta json it before we can use it
      //we then call imageGetter on the data, and then send it back to the app
      resolve(imageGetter(response.json()));
    })
    .catch((err) => {
      console.log('Error in get spots', err); 
      reject(err);
    });
  });
};

//this will go through all of our data, check the category and tag it with an icon to later be used
const imageGetter = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].category === 'Holiday') {
      data[i].icon = wreath;
    }
    if (data[i].category === 'Nature') {
      data[i].icon = tree;
    }
    if (data[i].category === 'Street art') {
      data[i].icon = spraycan;
    }
  }
  return data;
};

export default getSpots;
