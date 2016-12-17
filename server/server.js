const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/../client'));

// ----- MIDDLEWARE -----

// I'm in the middle!

// ----- ROUTES -----
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../web/public/index.html'));
});

// ----- LISTEN -----
var port = process.env.PORT || 4040;
app.listen(port);
console.log('Listening on port ' + port);
