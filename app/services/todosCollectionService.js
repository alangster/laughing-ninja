
angular.module('TodoApp')
	.service('TodosCollectionService', TodosCollectionService);


function TodosCollectionService() {
	this.todos = [];

	this.todoCounts = {
		complete: 0,
		incomplete: 0
	}

	var that = this;
	
	var setCounts = function() {
		var complete = 0, incomplete = 0;
		that.todos.forEach(function(todo) {
			todo.is_complete ? ++complete : ++incomplete;
		});
		that.todoCounts.complete = complete;
		that.todoCounts.incomplete = incomplete;
	}

	this.getTodos = function() {
		return this.todos;
	}

	this.setTodos = function(todosCollection) {
		this.todos = todosCollection;
		setCounts();
		return this;
	};

	this.addTodo = function(todo) {
		this.todos.push(todo);
		this.todoCounts.complete++;
		return this;
	};

	this.adjustCounts = function(todo) {
		if (todo.is_complete) {
			this.todoCounts.complete++;
			this.todoCounts.incomplete--;
		} else {
			this.todoCounts.complete--;
			this.todoCounts.incomplete++;
		};
	}


}