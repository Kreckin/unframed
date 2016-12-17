const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();

// ----- MIDDLEWARE -----
app.use(express.static(__dirname + '/../client'));
app.use(function(req, res, next) { // print out requests
    console.log('---------');
    console.log('Received', req.method, req.url);
    next();
});

// ----- ROUTES -----
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../web/public/index.html'));
});

app.get('/spots', function (req, res) {
  db.getSpots(function(err, data){
    res.send(data);
  })
})

// ----- LISTEN -----
var port = process.env.PORT || 4040;
app.listen(port);
console.log('Listening on port ' + port);
