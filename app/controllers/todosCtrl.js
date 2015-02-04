
angular.module('TodoApp')
	.controller('TodosCtrl', TodosCtrl);


function TodosCtrl(Api, TodosCollectionService) {

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
}

// TodosCtrl.prototype.predicate = function(todo) {
// 	return true;
// }

// TodosCtrl.prototype.status = function(todo) {
// 	console.log(this.predicate);
// 	return this.predicate(todo);
// }

// TodosCtrl.prototype.displayAll = function() {
// 	this.predicate = function(input) {
// 				return true;
// 			}
// }

// TodosCtrl.prototype.displayComplete = function() {
// 	this.predicate = function(input) {
// 				return input.is_complete;
// 			}
// }

// TodosCtrl.prototype.displayIncomplete = function() {
// 	this.predicate = function(input) {
// 				return !input.is_complete;
// 			}
// }