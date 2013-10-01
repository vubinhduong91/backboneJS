

//The application view handle: edit, update, delele item, also display todo items.

var app = app || {};


// 

app.AppView = Backbone.View.extend({

//phan tu el in ac son.
  el: '#todoapp',

    // Our template for the line of statistics at the bottom of the app.
  statsTemplete: _.template( $('#stats-template').html() ),

  // Delegated events for creating new items, and clearing completed ones.

  events:{
  	'keypress #new-todo': 'createOneEnter',
  	'click #clear-completed': 'clearCompleted',
  	'click #toggle-all': 'toggleAllComplete'
  },


  // khoi tao View.
  intitalize: function(){
  	this.allCheckbox = this.$('#toggle-all')[0];
  	this.$input = this.$('#new-todo');
  	this.$footer = this.$('#footer');
  	this.$main = this.$('#main');

  	this.listenTo(app.Todos, 'add', this.addOne);
  	this.listenTo(app.Todos, 'reset', this.addAll);
  	this.listenTo(app.Todos, 'change:completed', this.filterOne);
  	this.listenTo(app.Todos, 'filter', this.filterAll);

  	app.Todos.fetch();
  },

  	 // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.

	render: function(){
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.completed().length;

		if(app.Todos.length){
			this.$main.show();
			this.$footer.show();

			this.$footer.html(this.statsTemplete({
				completed: completed,
				remaining: remaining
			}));

		 this.$('#filters li a')
          .removeClass('selected')
          .filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
          .addClass('selected');


		} else{
			this.$main.hide();
			this.$footer.hide();
		}
		this.allCheckbox.checked = !remaining;
	},

 // add a single todo item to list by creating a view for it and
 // appending its element to the '<ul>'
	addOne: function(todo){
		var view = new app.TodoView({
			model: todo
		});
		$('#todo-list').append(view.render().el);
	},

 //add all items in the **Todos** collection at once.
 	addAll: function(){
 		this.$('#todo-list').html('');
 		app.Todos.each(this.addOne, this);
 	},	 		


 	filterOne: function(todo){
 		todo.triger('visible');
 	},

 	filterAll: function(){
 		app.Todos.each(this.filterOne, this);
 	},

 	//new Attribute for a new Todo Item.

 	newAtrributes: function(){
 		return{
 			title: this.$input.val().trim(),
 			order:app.Todos.nextOrder(),
 			completed: false
 		};
 	},

 	//If you hit Enter -> add new Todo iteam
 	createOneEnter: function(){
 		if(event.which !== ENTER_KEY || !this.$input.val().trim() ) {
 			return;
 		}

 		app.Todos.create(this.newAtrributes());
 		this.$input.val('');

 	},


 	//Clear all completed todo items, destroying the models.
 	clearCompleted:function(){
 		// _.invoke is a underscore js function.
 		_.invoke(app.Todos.completed(), 'destroy');
 		return false;
 	},

 	toggleAllComplete: function(){

 		var completed = this.allCheckbox.checked;
 		app.Todos.each( function(todo){
 			todo.save({
 				'completed': completed
 			});
 		});

 	}







});


