'use strict';

var mongoose = require('mongoose'),
    Bookmark = mongoose.model('Bookmark');

exports.list_all_bookmark = function(req, res) {
  Bookmark.find({}, function(err, bookmark) {
    if (err)
      res.send(err);
    res.status(200).send(bookmark);
  });
};


exports.create_a_bookmark = function(req, res) {
  var new_bookmark = new Bookmark(req.body);
  new_bookmark.save(function(err, bookmark) {
    if (err)
      res.send(err);
    res.status(200).send(bookmark);
  });
};

exports.read_a_bookmark = function(req, res) {
  Bookmark.findById(req.params.bookmarkId, function(err, bookmark) {
    if (err)
      res.send(err);
    if(bookmark  == null){
      res.status(404).send({});
    }
    res.json(bookmark);
  });
};

exports.update_a_bookmark = function(req, res) {
  console.log(req.params.bookmarkId);
  var bookmarkId = req.params.bookmarkId || ''
  console.log(req.body);
  Bookmark.findOneAndUpdate({_id: bookmarkId}, req.body, {new: true}, function(err, bookmark) {
    if (err)
      res.send(err);
    console.log(bookmark)
    res.json(bookmark);
  });
};
// Task.remove({}).exec(function(){});
exports.delete_a_bookmark = function(req, res) {
  Bookmark.remove({
    _id: req.params.bookmarkId
  }, function(err, bookmark) {
    if (err)
      return res.send(err);
    res.json({ message: 'Bookmark successfully deleted' });
  });
};


exports.filter_by_id = function(req, res) {
  Bookmark.find({ tags: {$regex: req.params.tagId} }, function(err, bookmark) {
    if (err)
      res.send(err);
    console.log(bookmark)
    res.json(bookmark);
  });
};
