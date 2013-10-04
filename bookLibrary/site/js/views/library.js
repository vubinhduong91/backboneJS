//views/library.js

var app = app || {};


app.LibraryView = Backbone.View.extend({
	el: '#books',
	initialize: function(initbook){
		this.collection = new app.Library(initbook);
		this.render();

	},

	events:{
		'click #add': 'addBook'
	},

	addBook: function(e){
		e.preventDefault;
		var dataForm = {};
		$( '#addBook div' ).children( 'input' ).each( function( i, el ) {
        if( $( el ).val() != '' )
        {
            dataForm[ el.id ] = $( el ).val();
        }
    });

    this.collection.add( new app.Book( dataForm ) );
    
	},

	render: function(){
		this.collection.each(function(item) {
			this.renderBook(item);
		}, this);
	},
	renderBook: function(item){
		var bookView = new app.BookView ({
			model: item
		});
		this.$el.append(bookView.render().el);
	}
});