
angular.module('TodoApp')
	.controller('CreateTodoCtrl', CreateTodoCtrl);

function CreateTodoCtrl(Api, TodosCollectionService) {

	this.newTodo = {
		description: "",
	};
	this.errors = {
		todoCreation: null
	}

	this.addTodo = function() {
		var that = this;
		var todoDescription = this.newTodo.description.trim();
		if (!todoDescription) { return };
		
		Api.addNewTodo(todoDescription).then(function(result) {
			that.errors.todoCreation = null;
			that.newTodo.description = "";
			TodosCollectionService.addTodo(result);
		}, function() {
			that.errors.todoCreation = "Could not save Todo.";
		});
	}
}

