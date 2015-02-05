
angular.module('TodoApp')
	.controller('TodosCtrl', TodosCtrl);


function TodosCtrl(Api, TodosCollectionService) {

	var originalTodos = {};

	this.errors = {
		todoFetch: null,
	}

	this.TodosCollectionService = TodosCollectionService;

	// var makeChart = function() {
	// 	console.log(TodosCollectionService.todoCounts);
	// 	var pieChart = {};
	// 	pieChart.type = "PieChart";
	// 	pieChart.data = [
	// 		['something','something else'],
	// 		['Complete', TodosCollectionService.todoCounts.complete],
	// 		['Incomplete', TodosCollectionService.todoCounts.incomplete]
	// 	];
	// 	pieChart.options = {
 //      displayExactValues: true,
 //      width: 400,
 //      height: 200,
 //      is3D: true,
 //      chartArea: {left:10,top:10,bottom:0,height:"100%"}
 //    };
 //    pieChart.formatters = {
 //      number : [{
 //      	columnNum: 1,
 //      	pattern: "$ #,##0.00"
 //      }]
 //    };
 //    return pieChart;
	// }

	var that = this;
	(function init() {
		Api.fetchTodos().then(function(fetchedTodos) {
			TodosCollectionService.setTodos(fetchedTodos);
		}, function() {
			that.errors.todoFetch = "Experienced a problem loading your todos.";
		})
		var pieChart = {};
		pieChart.type = "PieChart";
		pieChart.data = [
			['something','something else'],
			['Complete', TodosCollectionService.todoCounts.complete],
			['Incomplete', TodosCollectionService.todoCounts.incomplete]
		];
		pieChart.options = {
      displayExactValues: true,
      width: 400,
      height: 200,
      is3D: true,
      chartArea: {left:10,top:10,bottom:0,height:"100%"}
    };
    pieChart.formatters = {
      number : [{
      	columnNum: 1,
      	pattern: "$ #,##0.00"
      }]
    };
		that.chart = pieChart;
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
		originalTodos[todo.id] = todo;
	}

	this.editTodo = function(todo, context) {
		Api.updateTodo(todo).then(function() {
			if (context) {
				TodosCollectionService.adjustCounts(todo);
			}
			originalTodos[todo.id] = null;
		}, function() {
			todo = originalTodos[todo.id];
		})
	}



















}
