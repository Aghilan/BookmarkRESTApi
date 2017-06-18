'use strict';

var mongoose = require('mongoose'),
    Bookmark = mongoose.model('Bookmark');

/*
Returns list of bookmarks for any given user
*/
exports.list_all_bookmark = function(req, res) {
  Bookmark.find({userId : req.params.userId}, function(err, bookmark) {
    if (err)
      res.send(err);
    res.status(200).send(bookmark);
  });
};

/*
Creates a new bookmark given its name, url and tags for any given user
*/
exports.create_a_bookmark = function(req, res) {
  var new_bookmark = new Bookmark(req.body);
  new_bookmark.save(function(err, bookmark) {
    if (err)
      res.send(err);
    res.status(200).send(bookmark);
  });
};


/*
Prints information like name, url, tags and owner( corresponding user ) given any bookmark
*/
exports.read_a_bookmark = function(req, res) {
  Bookmark.findById(req.params.bookmarkId, function(err, bookmark) {
    if (err)
      res.send(err);
    // If the bookmark is not available in the DB, return 404 error response
    if(bookmark  == null){
      res.status(404).send({});
    }
    res.json(bookmark);
  });
};

/*
Updates information like name, url, tags and owner( corresponding user ) given any bookmark
*/
exports.update_a_bookmark = function(req, res) {
  console.log(req.params.bookmarkId);
  var bookmarkId = req.params.bookmarkId || ''
  Bookmark.findOneAndUpdate({_id: bookmarkId}, req.body, {new: true}, function(err, bookmark) {
    if (err)
      res.send(err);
    res.json(bookmark);
  });
};

/*
Deletes the record of the bookmark
*/
exports.delete_a_bookmark = function(req, res) {
  Bookmark.remove({
    _id: req.params.bookmarkId
  }, function(err, bookmark) {
    if (err)
      return res.send(err);
    res.json({ message: 'Bookmark successfully deleted' });
  });
};

/*
Returns a set of bookmarks associated with the user, given a search term.
Regex pattern is used to search for given tag.
*/
exports.filter_by_id = function(req, res) {
  var search_term = req.params.tagId;
  var username= req.params.userId;
  var query = { tags:{$regex: search_term}};

  //Empty search term is considered as '*'
  if (search_term === '*'){
    query= {}
  }
  Bookmark.find(Object.assign(query, {userId: username}), function(err, bookmark) {
    if (err)
      res.send(err);
    res.json(bookmark);
  });
};
