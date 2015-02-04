
angular.module('TodoApp')
	.controller('TodosCtrl', TodosCtrl);


function TodosCtrl(Api, TodosCollectionService) {

	// this.todos = TodosCollectionService.todos;
	this.Api = Api;
	this.errors = {
		todoFetch: null,
	}
	this.TodosCollectionService = TodosCollectionService;

	// var that = this;
	// this.$watch(
	// 	function() {return TodosCollectionService.newTodo},
	// 	function(TCSValue) {
	// 		if (TCSValue) {
	// 			that.todos.push(TodosCollectionService.newestTodo());
	// 		}
	// 	}
	// )

	var that = this;
	(function init() {
		that.Api.fetchTodos().then(function(fetchedTodos) {
			TodosCollectionService.setTodos(fetchedTodos);
		}, function() {
			that.erros.todoFetch = "Experienced a problem loading your todos.";
		})
	})();
}