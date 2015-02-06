
angular.module('TodoApp')
	.service('TodosCollectionService', TodosCollectionService);


function TodosCollectionService() {
	var todos = [];

	var todoCounts = {
		complete: 0,
		incomplete: 0
	}

	var that = this;
	
	var setCounts = function() {
		var complete = 0, incomplete = 0;
		todos.forEach(function(todo) {
			todo.is_complete ? ++complete : ++incomplete;
		});
		todoCounts.complete = complete;
		todoCounts.incomplete = incomplete;
	}

	this.getTodoCounts = function() {
		return todoCounts;
	}

	this.getTodos = function() {
		return todos;
	}

	this.setTodos = function(todosCollection) {
		todos = todosCollection;
		setCounts();
		return this;
	};

	this.addTodo = function(todo) {
		todos.push(todo);
		++todoCounts.incomplete;
		return this;
	};

	this.adjustCounts = function() {
		setCounts();
	};

}
