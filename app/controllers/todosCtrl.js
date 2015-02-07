
angular.module('TodoApp')
	.controller('TodosCtrl', TodosCtrl);


function TodosCtrl(Api, TodosCollectionService, $rootScope) {

	var that = this;
	var originalTodos = {};
	
	this.errors = {
		todoFetch: null,
	}
	
	this.todos = [];

	$rootScope.$on('add', function() {adjustChart()});

	var makeChart = function() {
		var counts = TodosCollectionService.getTodoCounts();
		var pieChart = {};
		pieChart.type = "PieChart";
		pieChart.data = [
			['',''],
			['Complete', counts.complete],
			['Incomplete', counts.incomplete]
		];
		pieChart.options = {
      displayExactValues: true,
      width: 400,
      height: 200,
      is3D: true,
      chartArea: {left:10,top:10,bottom:0,height:"100%"},
      colors: ['#4178FF', '#101E40'],
      backgroundColor: 'none'
    };
    return pieChart;
	};

	(function init() {
		Api.fetchTodos().then(function(fetchedTodos) {
			TodosCollectionService.setTodos(fetchedTodos);
			that.todos = TodosCollectionService.getTodos();
			that.chart = makeChart();
		}, function() {
			that.errors.todoFetch = "Experienced a problem loading your todos.";
		})
	})();

	var adjustChart = function() {
		var counts = TodosCollectionService.getTodoCounts();
		that.chart.data[1][1] = counts.complete;
		that.chart.data[2][1] = counts.incomplete;
	}

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

	this.editTodo = function(todo) {
		Api.updateTodo(todo).then(function() {
			originalTodos[todo.id] = null;
			TodosCollectionService.adjustCounts();
			adjustChart();
		}, function() {
			todo = originalTodos[todo.id];
		})
	}

	this.toggleCompletion = function(todo) {
		that.saveOriginal(todo);
		todo.is_complete = !todo.is_complete;
		that.editTodo(todo);
	}

}
