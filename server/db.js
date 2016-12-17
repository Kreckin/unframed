const neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver(require('./config.js').graph.url, neo4j.auth.basic(require('./config.js').graph.user, require('./config.js').graph.pw));
var session = driver.session();

var spots = {
  get: function(cb){
    session
      .run( "MATCH (n:Categories) RETURN n LIMIT 25" )
      .then( function( result ) {
        cb(null, result)
      })
  },
  post: function function_name(argument) {
    // body...
  }
}

module.exports = {
  getSpots: spots.get
}

// categories: {
//   get: function function_name(argument) {
//     // body...
//   },
//   post: function function_name(argument) {
//     // body...
//   }
// }



