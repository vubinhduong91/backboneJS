
var app = app || {};

//Todo model.
// This model include 3 attributes: title, completed , and order.


app.Todo = Backbone.Model.extend({

// set default value 
	defaults: {
		title: '',
		completed: false
	},

//toggle the compele state of this todo item.
		
	toggle: function(){
		this.save({
			completed: !this.get('completed')
		});
	}

});



//Todo colection
//__store the Todo Items's list.
// store in *local Storage* not a remote server.

var TodoList = Backbone.Collection.extend({

	//reference to this collection's model.
	model: app.Todo,
	//save all the todo items under the "todos-backbone" nameSpace.
	localStorage:new Backbone.LocalStorage('todos-backbone'),

	//Filter down the list of all todo items that are finished.
	completed: function() {
		 return this.filter(function(todo){
		 	return todo.get('completed');
		 });
	},


	//Filter down the list to only todo items that are still not finished.
	remaining: function(){
		return this.without.apply(this, this.completed());
	},

	nextOrder: function(){

		if(!this.length){
			return 1;
		}
		return this.last().get('order') + 1;
	},


	//Todos sorted by their original insertion order.
	comparator: function(todo) {
		return todo.get('order');
	}

});



app.Todos = new TodoList();