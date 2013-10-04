//models/book.js
var app = app || {};

app.Book = Backbone.Model.extend({
	defaults: {
		coverImage: 'image/xxx.jpg',
		title: 'no title',
		author: 'Unknown',
		releaseDate:'Unknown',
		keyworks:'none'
	}
});

