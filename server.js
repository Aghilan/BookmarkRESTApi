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

app.listen(port);

console.log('bookmark RESTful API server started on: ' + port);
