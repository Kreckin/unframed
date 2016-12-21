const neo4j = require('neo4j-driver').v1;
const deploy = !process.env.server ? require('./config').graph : { server: process.env.server, user: process.env.user, pass: process.env.pass }; 
const db = require('seraph')(deploy);
const model = require('seraph-model');

const Spot = model(db, 'Spot');
const User = model(db, 'User');
const Category = model(db, 'Categories');



//really awkward way to enforce schema, validation will check each typeof to make sure its the right type
//if callback is called on a truthy value it'll stop the save process
// const validateSpot = (spot, callback) => {
//   if (typeof spot.latitude !== 'number' || typeof spot.longitude !== 'number') {
//       callback('please enter your current location as a number');
//   } else if (typeof spot.category !== 'string') {
//       callback('please enter category as a string');
//   } else if (typeof spot.title !== 'string') {
//       callback('please enter title as a string');
//   } else if (typeof spot.img_url !== 'string') {
//       callback('cloudinary error?');
//   }
  //uncomment these when we add them to our schema

  // else if (typeof spot.upvotes !== 'number' || typeof spot.downvotes !== 'number') {
  //   callback('please enter upvotes/downvotes as numbers');
  // }
  // else if (typeof spot.creator !== 'string') {
  //   callback('creator is not a string');
  // } 
//   else {
//     callback();
//   }
// };
//this solves everything apparently
Spot.schema = {
  title: { type: String, required: true },
  category: { type: String, required: true },
  img_url: { type: String, required: true },
  latitude:{ type: Number, required: true },
  longitude:{ type: Number, required: true },
  upvotes:{ type: Number, default:1 },
  downvotes:{ type: Number, default: 0 },
  percentage:{ type: Number, default: 1 },
  spot_id: { default: Math.random()*10}
};
//Spot.on('validate', validateSpot);

module.exports = {
  spots: {
    get: () => {
      return new Promise((resolve, reject) => {
        Spot.findAll((err, allOfTheseModels) => {
          if (err) reject(err);
          else resolve(allOfTheseModels);
        });
      });
    },
    post: (obj) => {
      return new Promise((resolve, reject) => {
        Spot.save(obj, (err, savedObject) => {
          if (err) reject(err);
          else resolve(savedObject);
        });
      });
    },
  },

  users: {
    get: () => {
      return new Promise((resolve, reject) => {
        User.findAll((err, allOfTheseModels) => {
          if (err) reject(err);
          else resolve(allOfTheseModels);
        });
      });
    },
    post: (obj) => {
      return new Promise((resolve, reject) => {
        User.save(obj, (err, savedObject) => {
          if (err) reject(err);
          else resolve(savedObject);
        });
      });
    }
  },

  categories: {
    get: () => {
      return new Promise((resolve, reject) => {
        Category.findAll((err, allOfTheseModels) => {
          if (err) reject(err);
          else resolve(allOfTheseModels);
        });
      });
    },
    post: (obj) => {
      return new Promise((resolve, reject) => {
        Category.save(obj, (err, savedObject) => {
          if (err) reject(err);
          else resolve(savedObject);
        });
      });
    }
  },

  votes: {
    upvote: (id) => {
      return new Promise((resolve, reject) => {
        Spot.where({ spot_id: id }, ((err, spot) => {
          if (err) reject(err);
          else {
            console.log('this is the spot!', spot);
            spot[0].upvotes++;
            spot[0].percentage = spot[0].upvotes / (spot[0].upvotes + spot[0].downvotes);
            Spot.update(spot[0], (err,savedObject) => {
              console.log('this is the second spot, ', spot)
              if (err) reject(err);
              else resolve(savedObject);
              });
          }
        }));
      });
    },
    downvote: (id) => {
      return new Promise ((resolve, reject) => {
        Spot.where({ spot_id: id }, (err, spot) => {
          spot[0].downvotes++;
          spot[0].percentage = spot[0].upvotes / (spot[0].upvotes + spot[0].downvotes);
          Spot.update(spot[0],(err, savedObject)=>{
            if(err) reject(err)
            else resolve(savedObject)
          })
        })
      });
    }
  },
};
