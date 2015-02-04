
angular.module('TodoApp')
	.controller('CreateTodoCtrl', CreateTodoCtrl);

function CreateTodoCtrl(Api, TodosCollectionService) {

	this.newTodo = {
		description: "",
	};
	this.errors = {
		todoCreation: null
	}

	this.Api = Api;
	this.TodosCollectionService = TodosCollectionService;
}

CreateTodoCtrl.prototype.addTodo = function() {
	var that = this;
	var todoDescription = this.newTodo.description.trim();
	if (!todoDescription) { return };
	
	this.Api.addNewTodo(todoDescription).then(function(result) {
		that.errors.todoCreation = null;
		that.newTodo.description = "";
		that.TodosCollectionService.addTodo(result);
	}, function() {
		that.errors.todoCreation = "Could not save Todo.";
	});
}