import config from './config.js';


const getSpots = (lat, lon, distance) => {
  return new Promise((resolve, reject) => {
    //sends a GET request to our server/spots
  fetch(`${config.apiUrl}/spots?lat=${lat}&lon=${lon}&distance=${distance}`)
    .then((response) => {
      //with fetch we gotta json it before we can use it
      //we then call imageGetter on the data, and then send it back to the app
      return response.json();
    })
    .then((data) => {
      return resolve(distanceGetter(data));
    })
    .catch((err) => {
      console.log('Error in get spots', err); 
      reject(err);
    });
  });
};
const distanceGetter = (data) => {
            data.forEach((item) => {
              item.node.distance = item.distance;
            })
            return data.map(item => item = item.node);
}
//this will go through all of our data, check the category and tag it with an icon to later be used
const imageGetter = (data) => {
  //Change these later as now they are all the same
  const imgObj = {
    'Street art': {
      new: '',
      top: '',
      middle: '',
      low: ''
    },
    Holiday: {
      new: '',
      top: '',
      middle: '',
      low: ''
    },
    Nature: {
      new: '',
      top: '',
      middle: '',
      low: ''
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
