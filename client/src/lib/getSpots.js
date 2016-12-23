const tree = require('../icons/tree-small.png');
const spraycan = require('../icons/spraycan-small.png');
const wreath = require('../icons/wreath-small.png');

const getSpots = (callback) => {
  //sends a GET request to our server/spots
  fetch('http://ec2-54-165-55-247.compute-1.amazonaws.com:4040/spots')
    .then((response) => {
      //with fetch we gotta json it before we can use it
      return response.json();
      //we then call imageGetter on the data, and then send it back to the app
    })
    .then((data) => callback(imageGetter(data)))
    .catch((err) => console.log('Error in get spots', err));
};
//this will go through all of our data, check the category and tag it with an icon to later be used
const imageGetter = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].category === 'holiday') {
      data[i].icon = wreath;
    }
    if (data[i].category === 'nature') {
      data[i].icon = tree;
    }
    if (data[i].category === 'street_art') {
      data[i].icon = spraycan;
    }
  }
  return data;
};

export default getSpots;
