
angular.module('TodoApp')
	.controller('CreateTodoCtrl', CreateTodoCtrl);

function CreateTodoCtrl($cookieStore, $http, TodosCollectionService) {

	this.TodosCollectionService = TodosCollectionService;
	this.$http = $http;
	this.$coookieStore = $cookieStore;

}