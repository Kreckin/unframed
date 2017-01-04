const path = require('path');
const fs = require('fs');
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary'); // stores images
const request = require('request');

if (!process.env.cloud_name) {
  cloudinary.config(require('./config').cloudinary);
} else {
  const deploy = {
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  };
  cloudinary.config(deploy);
}

const multer = require('multer'); // Node.js middleware for handling `multipart/form-data`

const upload = multer({ dest: 'temp/' }); // set temp location of new files

const app = express();

// ----- MIDDLEWARE -----
app.use(express.static(path.join(__dirname, '/../web/public/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => { // print out incoming requests
    console.log('---------');
    console.log('Received', req.method, req.url);
    next();
});

// ----- ROUTES -----
app.get('/', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '/../web/public/index.html')));
});

app.get('/spots', (req, res) => {
  db.spots.get(req.query)
    .then((resolve) => {
      console.log('sending', resolve);
      res.send(resolve);
    })
    .catch((reject) => {
      console.log('rejecting with', reject);
      res.status(500).send(reject);
    });
});

app.post('/spots', upload.single('spot_image'), (req, res) => {
  //we parse the latitude and longitude we get here so we save a number in our database
  req.body.latitude = parseFloat(req.body.latitude);
  req.body.longitude = parseFloat(req.body.longitude);
  if (req.file !== undefined) {
    // send spot photo to cloudinary
    cloudinary.uploader.upload(req.file.path, (result) => { 
      // delete file from server
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error on image delete:', err); 
        } else {
          const postObj = req.body;
          postObj.img_url = result.secure_url;
          db.spots.post(req.body)
            .then((resolve) => {
              console.log('sending', resolve);
              res.status(201).send(resolve);
            })
            .catch((reject) => {
              console.log('rejecting with', reject);
              res.status(500).send(reject);
            });
        }
      });
    });
  } else {
    res.status(400).send('Spots require images');
  }
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
app.get('/upvote/:id', (req, res) => {
  db.votes.upvote(parseFloat(req.params.id))
    .then((resolve) => {
      console.log('sending', resolve);
      res.send(resolve);
    })
    .catch((reject) => {
      console.log('rejecting with', reject);
      res.status(500).send(reject);
    });
});

app.get('/downvote/:id', (req, res) => {
  db.votes.downvote(parseFloat(req.params.id))
    .then((resolve) => {
      console.log('sending', resolve);
      res.send(resolve);
    })
    .catch((reject) => {
      console.log('rejecting with', reject);
      res.status(500).send(reject);
    });
});

app.get('/fetchLatLong/:address', (req, res) => {
  const mapKey = process.env.mapKey || require('./config').maps.mapKey;
  const address = req.params.address;
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?';
  request(`${url}&address=${address}&key=${mapKey}`, (err, response, body) => {
    if (err) res.status(500).send(err);
    if (!err && response.statusCode === 200) {
      res.send(body);
    }
  });
});
//so for maxiumum confusion this route takes the userID prop on the user object
app.get('/favorites/:userID', (req, res) => {
  const uID = req.params.userID;
  db.favorites.get(uID)
    .then((resolve) => {
      console.log('sending', resolve);
      res.send(resolve);
    })
    .catch((reject) => {
      console.log('rejecting with', reject);
      res.status(500).send(reject);
    });
});
//while these two take the id property of the user and the spot
app.post('/favorites/add', (req, res) => {
  const uID = req.body.userID;
  const sID = req.body.spotID;
  db.favorites.add(uID, sID)
    .then((resolve) => {
      console.log('sending', resolve);
      res.send(resolve);
    })
    .catch((reject) => {
      console.log('rejecting with', reject);
      res.status(500).send(reject);
    });
});
app.post('/favorites/remove', (req, res) => {
  const uID = req.body.userID;
  const sID = req.body.spotID;
  db.favorites.remove(uID, sID)
    .then((resolve) => {
      console.log('sending', resolve);
      res.send(resolve);
    })
    .catch((reject) => {
      console.log('rejecting with', reject);
      res.status(500).send(reject);
    });
});


// ----- LISTEN -----
const port = process.env.PORT || 4040;
app.listen(port);
console.log('Listening on port ' + port);

