const express = require('express');
const path = require('path');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();

// ----- MIDDLEWARE -----
app.use(express.static(path.join(__dirname, '/../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => { // print out requests
    console.log('---------');
    console.log('Received', req.method, req.url);
    next();
});

// ----- ROUTES -----
app.get('/', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '/../web/public/index.html')));
});

app.get('/spots', (req, res) => {
  db.spots.get()
    .then((resolve) => {
      console.log('sending', resolve);
      res.send(resolve);
    })
    .catch((reject) => {
      console.log('rejecting with', reject);
      res.status(500).send(reject);
    });
});

app.post('/spots', (req, res) => {
  db.spots.post(req.body)
    .then((resolve) => {
      console.log('sending', resolve);
      res.send(resolve);
    })
    .catch((reject) => {
      console.log('rejecting with', reject);
      res.status(500).send(reject);
    });
});

app.get('/categories', (req, res) => {
  db.categories.get()
    .then((resolve) => {
      console.log('sending', resolve);
      res.send(resolve);
    })
    .catch((reject) => {
      console.log('rejecting with', reject);
      res.status(500).send(reject);
    });
});

app.post('/categories', (req, res) => {
  db.categories.post(req.body)
    .then((resolve) => {
      console.log('sending', resolve);
      res.send(resolve);
    })
    .catch((reject) => {
      console.log('rejecting with', reject);
      res.status(500).send(reject);
    });
});

app.get('/users', (req, res) => {
  db.users.get()
    .then((resolve) => {
      console.log('sending', resolve);
      res.send(resolve);
    })
    .catch((reject) => {
      console.log('rejecting with', reject);
      res.status(500).send(reject);
    });
});

app.post('/users', (req, res) => {
  db.users.post(req.body)
    .then((resolve) => {
      console.log('sending', resolve);
      res.send(resolve);
    })
    .catch((reject) => {
      console.log('rejecting with', reject);
      res.status(500).send(reject);
    });
});

// app.get('/spots/:spotId', function (req, res) {
//   db.spots.get(req.params, function(err, data){
//     res.send(data);
//   })
// })

// ----- LISTEN -----
const port = process.env.PORT || 4040;
app.listen(port);
console.log('Listening on port ' + port);