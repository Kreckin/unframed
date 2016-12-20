const neo4j = require('neo4j-driver').v1;
const deploy = !process.env.server ? require('./config').graph : { server: process.env.server, user: process.env.user, pass: process.env.pass }; 
const db = require('seraph')(deploy);
const model = require('seraph-model');

const Spot = model(db, 'Spot');
const User = model(db, 'User');
const Category = model(db, 'Categories');

// TODO: add validation
// model.on('validate', validateAge);
// db.constraints.uniqueness.createIfNone('Spot', 'latitude', (err, constraint)=> {
//   console.log(constraint); 
//   // -> { type: 'UNIQUENESS', label: 'Person', property_keys: ['name'] }
// });

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
