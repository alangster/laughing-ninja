describe('TodosCtrl', function() {
	var scope, controller, ctrl, ApiServiceMock, TodosCollectionServiceMock, q, todos;

	beforeEach(function() {
		module('TodoApp');
		
		todos = [
			{id: 1, description: 'Floss', is_complete: false},
			{id: 2, description: 'Shovel driveway', is_complete: true},
			{id: 3, description: 'Drink coffee', is_complete: true}
		];

		inject(function($rootScope, $controller, $q, $filter) {
			scope = $rootScope.$new();
			controller = $controller;
			q = $q;
			
			TodosCollectionServiceMock = {
				setTodos: function() {},
				getTodos: function() {},
				getTodoCounts: function() {},
				adjustCounts: function() {}
			};
			
			ApiServiceMock = {
				fetchTodos: function() {},
				updateTodo: function() {}
			};
			
			spyOn(ApiServiceMock, 'fetchTodos').and.returnValue(q.when(todos));
			spyOn(TodosCollectionServiceMock, 'setTodos');
			spyOn(TodosCollectionServiceMock, 'getTodos').and.returnValue(todos);
			spyOn(TodosCollectionServiceMock, 'getTodoCounts').and.returnValue({complete: 2, incomplete: 1});
		});

		ctrl = controller('TodosCtrl', {
			$scope: scope,
			Api: ApiServiceMock,
			TodosCollectionService: TodosCollectionServiceMock
		});
		scope.$apply();

	});

	describe('Initialization', function() {
		
		describe('todo fetch error', function() {
			it('should be null', function() {
				expect(ctrl.errors.todoFetch).toBeNull();
			});
		});

		it('should call Api.fetchTodos', function() {
			expect(ApiServiceMock.fetchTodos).toHaveBeenCalled();
		});

		it('should call TodosCollectionService.setTodos', function() {
			expect(TodosCollectionServiceMock.setTodos).toHaveBeenCalledWith(todos);
		});

		it('should call TodosCollectionService.getTodoCounts', function() {
			expect(TodosCollectionServiceMock.getTodoCounts).toHaveBeenCalled();
		});

		it("shold set controller's todo property", function() {
			expect(ctrl.todos).toEqual(todos);
		});

		describe('Pie Chart', function() {
			it('should have the correct data', function() {
				expect(ctrl.chart.data[1][1]).toEqual(2);
				expect(ctrl.chart.data[2][1]).toEqual(1);
			});
		});
	});

	describe('status filter', function() {
		var completeTodo = {id: 4, description: 'done', is_complete: true}
		var incompleteTodo = {id: 5, description: 'not done', is_complete: false}

		it('should be preset to display all', function() {
			expect(ctrl.status(completeTodo)).toEqual(completeTodo);
			expect(ctrl.status(incompleteTodo)).toEqual(incompleteTodo);
		});

		describe('displayComplete', function() {
			it('should change status filter to deny incomplete todos', function() {
				ctrl.displayComplete();
				expect(ctrl.status(completeTodo)).toBeTruthy();
				expect(ctrl.status(incompleteTodo)).toBeFalsy();
			});
		});

		describe('displayIncomplete', function() {
			it('should change status filter to deny complete todos', function() {
				ctrl.displayIncomplete();
				expect(ctrl.status(completeTodo)).toBeFalsy();
				expect(ctrl.status(incompleteTodo)).toBeTruthy();
			});
		});
	});

	describe('toggleCompletion', function() {
		var toggleTodo = {id: 6, description: 'something', is_complete: false};
		
		beforeEach(function() {
			spyOn(ctrl, 'saveOriginal');
			spyOn(ctrl, 'editTodo');
			ctrl.toggleCompletion(toggleTodo);
		});

		it('should toggle the todo completion state', function() {
			expect(toggleTodo.is_complete).toBeTruthy();
		});

		it('should call saveOriginal', function() {
			expect(ctrl.saveOriginal).toHaveBeenCalledWith(toggleTodo);
		});

		it('should call editTodo', function() {
			expect(ctrl.editTodo).toHaveBeenCalledWith(toggleTodo);
		});
	});

	describe('editTodo', function() {

		var editingTodo = {id: 7, description: 'edited', is_complete: false};

		describe('successful edit', function() {
			beforeEach(function() {
				spyOn(ApiServiceMock, 'updateTodo').and.returnValue(q.when({}));
				spyOn(TodosCollectionServiceMock, 'adjustCounts');
				ctrl.editTodo(editingTodo);
				scope.$apply();
			});

			it('should call Api.updateTodo', function() {
				expect(ApiServiceMock.updateTodo).toHaveBeenCalledWith(editingTodo);
			});

			it('should call TodosCollectionService.adjustCounts', function() {
				expect(TodosCollectionServiceMock.adjustCounts).toHaveBeenCalled();
			});
		});
	});

});
