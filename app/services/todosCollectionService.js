
angular.module('TodoApp')
	.service('TodosCollectionService', TodosCollectionService);


function TodosCollectionService() {
	this.todos = [];

	// this.newTodo = false;

	this.getTodos = function() {
		return this.todos;
	}

	this.setTodos = function(todosCollection) {
		this.todos = todosCollection;
		return this;
	};

	this.addTodo = function(todo) {
		this.todos.push(todo);
		// this.newTodo = true;
		return this;
	};

	this.newestTodo = function() {
		// this.newTodo = false;
		return this.todos[todos.length - 1];
	}

	this.deleteTodo = function(todo) {

	}
}