
angular.module('TodoApp')
	.service('TodosCollectionService', TodosCollectionService);


function TodosCollectionService() {
	this.todos = [];

	this.getTodos = function() {
		return this.todos;
	}

	this.setTodos = function(todosCollection) {
		this.todos = todosCollection;
		return this;
	};

	this.addTodo = function(todo) {
		this.todos.push(todo);
		return this;
	};

	this.newestTodo = function() {
		return this.todos[todos.length - 1];
	}

	this.deleteTodo = function(todo) {

	}
}