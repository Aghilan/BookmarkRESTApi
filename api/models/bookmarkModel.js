'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookmarkSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the Bookmark'
  },
  url: {
    type: String,
    Required: 'Kindly enter the url of the Bookmark'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: [{
      type: String,
    }],
    default: ['general']
  }
});


module.exports = mongoose.model('Bookmark', BookmarkSchema);
