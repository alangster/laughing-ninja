
angular.module('TodoApp')
	.controller('CreateTodoCtrl', CreateTodoCtrl);

function CreateTodoCtrl($cookieStore, $http, TodosCollectionService) {



	this.newTodo = {
		description: "",
	}

	this.TodosCollectionService = TodosCollectionService;
	this.$http = $http;
	this.$coookieStore = $cookieStore;

}

CreateTodoCtrl.prototype.addTodo = function() {

}