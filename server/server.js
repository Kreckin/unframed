const express = require('express');
const path = require('path');
const db = require('./db');
const bodyParser = require('body-parser')

const app = express();

// ----- MIDDLEWARE -----
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
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
  db.spots.get()
    .then(function (resolve) {
      console.log('sending', resolve)
      res.send(resolve);
    })
    .catch(function (reject) {
      console.log('rejecting with', reject)
      res.status(500).send(reject);
    })
})

app.post('/spots', function (req, res) {
  db.spots.post(req.body)
    .then(function (resolve) {
      console.log('sending', resolve)
      res.send(resolve);
    })
    .catch(function (reject) {
      console.log('rejecting with', reject)
      res.status(500).send(reject);
    })
})

app.get('/categories', function (req, res) {
  db.categories.get()
    .then(function (resolve) {
      console.log('sending', resolve)
      res.send(resolve);
    })
    .catch(function (reject) {
      console.log('rejecting with', reject)
      res.status(500).send(reject);
    })
})

app.post('/categories', function (req, res) {
  db.categories.post(req.body)
    .then(function (resolve) {
      console.log('sending', resolve)
      res.send(resolve);
    })
    .catch(function (reject) {
      console.log('rejecting with', reject)
      res.status(500).send(reject);
    })
})


app.get('/users', function (req, res) {
  db.users.get()
    .then(function (resolve) {
      console.log('sending', resolve)
      res.send(resolve);
    })
    .catch(function (reject) {
      console.log('rejecting with', reject)
      res.status(500).send(reject);
    })
})

app.post('/users', function (req, res) {
  db.users.post(req.body)
    .then(function (resolve) {
      console.log('sending', resolve)
      res.send(resolve);
    })
    .catch(function (reject) {
      console.log('rejecting with', reject)
      res.status(500).send(reject);
    })
})




// app.get('/spots/:spotId', function (req, res) {
//   db.spots.get(req.params, function(err, data){
//     res.send(data);
//   })
// })

// ----- LISTEN -----
var port = process.env.PORT || 4040;
app.listen(port);
console.log('Listening on port ' + port);
