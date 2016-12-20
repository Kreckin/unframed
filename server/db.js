<<<<<<< HEAD
const db = require('seraph')(require('./config').graph);
=======
const neo4j = require('neo4j-driver').v1;
<<<<<<< HEAD
const db = require('seraph')(require('./config.js').graph);
>>>>>>> added icons, added tests for server paths, wrote functions to get data from server, implemented client side to use data
=======
const deploy = !process.env.server ? require('/config.js').graph : {server:process.env.server,user:process.env.user,pass:provess.env.pass}; 
const db = require('seraph')deploy
>>>>>>> added global variables for travis to use
const model = require('seraph-model');

const Spot = model(db, 'Spot');
const User = model(db, 'User');
const Category = model(db, 'Categories');

// TODO: add validation
// model.on('validate', validateAge);

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
  }
};
