
angular.module('TodoApp')
	.controller('TodosCtrl', TodosCtrl);


function TodosCtrl(Api, TodosCollectionService) {

	originalTodos = {};

	this.errors = {
		todoFetch: null,
	}

	this.TodosCollectionService = TodosCollectionService;

	var that = this;
	(function init() {
		Api.fetchTodos().then(function(fetchedTodos) {
			TodosCollectionService.setTodos(fetchedTodos);
		}, function() {
			that.errors.todoFetch = "Experienced a problem loading your todos.";
		})
	})();

	var predicate = function(input) {
		return input;
	}

	this.displayAll = function() {
		predicate = function(input) {
			return input;
		}
	}

	this.displayComplete = function() {
		predicate = function(input) {
			return input.is_complete;
		}
	}

	this.displayIncomplete = function() {
		predicate = function(input) {
			return !input.is_complete;
		}
	}

	this.status = function(todo) {
		return predicate(todo);
	}

	this.saveOriginal = function(todo) {
		originalTodos[todo.id] = todo.description;
	}

	this.editTodo = function(todo) {
		Api.updateTodo(todo).then(function() {
			originalTodos[todo.id] = null;
		}, function() {
			todo.description = originalTodos[todo.id];
		})
	}

}
