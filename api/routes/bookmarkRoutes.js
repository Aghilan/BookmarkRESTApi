'use strict';

module.exports = function(app) {
	var bookmark = require('../controllers/bookmarkController');
	var user = require('../controllers/userController')
	// todoList Routes
	app.route('/users/:userId/bookmarks')
		.get(bookmark.list_all_bookmark)
		.post(bookmark.create_a_bookmark);

	app.route('/bookmarks/:bookmarkId')
		.get(bookmark.read_a_bookmark)
		.put(bookmark.update_a_bookmark)
		.delete(bookmark.delete_a_bookmark);

	app.route('/users/:userId/bookmarks/tags/:tagId')
		.get(bookmark.filter_by_id);


	app.route('/users')
		.get(user.get_all_user)
		.post(user.register_user);

	app.route('/users/auth')
		.post(user.authenticate_user);
};
