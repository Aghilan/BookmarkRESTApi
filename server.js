var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Bookmark = require('./api/models/bookmarkModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser');

var cors = require('cors')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Bookmarkdb');

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var routes = require('./api/routes/bookmarkRoutes');
routes(app);

// app.options(function(req, res) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.status(200).send({});
// });

app.listen(port);

console.log('bookmark RESTful API server started on: ' + port);
