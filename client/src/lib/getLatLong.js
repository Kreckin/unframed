import config from './config.js';

const getLatLong = (options, callback) => {
	console.log("Here is a config", config.apiUrl)
//sends off an api request with options we pass in, this gets the closest address to our lat & long
  fetch(`${config.apiUrl}/fetchLatLong/${options.address}`)
  .then((response) => {
      return response.json();
    })
   .then((data) => callback(data.results[0].geometry.location))
  .catch((err) => console.log('Error in get lat long', err));
};

export default getLatLong;
