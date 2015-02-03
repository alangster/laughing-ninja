
angular.module('TodoApp')
	.service('TodosCollectionService', TodosCollectionService);


function TodosCollectionService() {
	var todos = [];

	this.getTodos = function() {
		return todos;
	}

	this.setTodos = function(todosCollection) {
		todos = todosCollection;
	};

	this.addTodo = function(todo) {
		todos.push(todo);
	};

	this.deleteTodo = function(todo) {

	}
}