'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.get_all_user = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.status(200).send(user);
  });
};


exports.authenticate_user = function(req, res) {
  User.findOne({ username : req.body.username, password: req.body.password} , function(err, user) {
    if (err)
      res.send(err);
    if(user  == null){
      res.status(404).send({});
    }
    res.json(user);
  });
};

exports.register_user = function(req, res) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.status(200).send(user);
  });
};

// exports.update_a_bookmark = function(req, res) {
//   console.log(req.params.bookmarkId);
//   var bookmarkId = req.params.bookmarkId || ''
//   console.log(req.body);
//   Bookmark.findOneAndUpdate({_id: bookmarkId}, req.body, {new: true}, function(err, bookmark) {
//     if (err)
//       res.send(err);
//     console.log(bookmark)
//     res.json(bookmark);
//   });
// };
// // Task.remove({}).exec(function(){});
// exports.delete_a_bookmark = function(req, res) {
//   Bookmark.remove({
//     _id: req.params.bookmarkId
//   }, function(err, bookmark) {
//     if (err)
//       return res.send(err);
//     res.json({ message: 'Bookmark successfully deleted' });
//   });
// };
//
//
// exports.filter_by_id = function(req, res) {
//   Bookmark.find({ tags: {$regex: req.params.tagId} }, function(err, bookmark) {
//     if (err)
//       res.send(err);
//     console.log(bookmark)
//     res.json(bookmark);
//   });
// };
