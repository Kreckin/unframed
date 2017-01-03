import config from './config.js';

const tree = require('../icons/tree-small.png');
const spraycan = require('../icons/spraycan-small.png');
const wreath = require('../icons/wreath-small.png');

const getSpots = (callback) => {
  //sends a GET request to our server/spots
  fetch(`${config.apiUrl}/spots`)
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
  //Change these later as now they are all the same
  const imgObj = {
    'Street art': {
      new: spraycan,
      top: spraycan,
      middle: spraycan,
      low: spraycan
    },
    Holiday: {
      new: wreath,
      top: wreath,
      middle: wreath,
      low: wreath
    },
    Nature: {
      new: tree,
      top: tree,
      middle: tree,
      low: tree
    }
  };
  for (let i = 0; i < data.length; i++) {
    if (data[i].upvotes + data[i].downvotes < 5) {
      data[i].level = 'new';
    } else if (data[i].percentage > 0.9) {
      data[i].level = 'top';
    } else if (data[i].percentage > 0.8) {
      data[i].level = 'middle';
    } else {
      data[i].level = 'low';
    }
    data[i].icon = imgObj[data[i].category][data[i].level];
  }
  return data;
};

export default getSpots;
