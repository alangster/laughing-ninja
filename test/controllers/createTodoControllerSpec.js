describe('CreateTodoCtrl', function() {
	var scope, controller, ctrl, ApiServiceMock, TodosCollectionServiceMock, q, deferred;

	beforeEach(function() {
		module('TodoApp');
		
		inject(function($rootScope, $controller, $q) {
			scope = $rootScope.$new();
			controller = $controller;
			q = $q;
		});

		ApiServiceMock = {
			addNewTodo: function() {}
		};

		TodosCollectionServiceMock = {
			addTodo: function() {}
		};

		ctrl = controller('CreateTodoCtrl', {
			$scope: scope,
			Api: ApiServiceMock,
			TodosCollectionService: TodosCollectionServiceMock
		});
	});

	describe('Initialization', function() {
		it('Should have a newTodo object', function() {
			expect(ctrl.newTodo).toBeDefined();
		});

		describe('newTodo object', function() {
			it('Should have a blank description', function() {
				expect(ctrl.newTodo.description).toEqual('');
			});
		});
	});

	describe('addTodo', function() {
		describe('valid todo', function() {
			
			var newDescription = 'Buy floss';
			var todoResponse = {id: 4, description: newDescription, is_complete: false};

			beforeEach(function() {
				ctrl.newTodo.description = newDescription;
			});

			describe('Successful addition', function() {

				beforeEach(function() {
					spyOn(ApiServiceMock, 'addNewTodo').and.returnValue(q.when(todoResponse));
					spyOn(TodosCollectionServiceMock, 'addTodo');
					ctrl.errors.todoCreation = "Error";
					ctrl.addTodo();
					scope.$apply();
				});

				it('should call Api.addNewTodo', function() {
					expect(ApiServiceMock.addNewTodo).toHaveBeenCalledWith(newDescription);
				});

				it('should pass the new todo to the collection', function() {
					expect(TodosCollectionServiceMock.addTodo).toHaveBeenCalledWith(todoResponse);
				});

				it('should clear any existing errors', function() {
					expect(ctrl.errors.todoCreation).toBeNull();
				});

				it('should clear the new todo object description', function() {
					expect(ctrl.newTodo.description).toEqual('');
				});
			});

			describe('Unsuccessful addition', function() {

				beforeEach(function() {
					spyOn(ApiServiceMock, 'addNewTodo').and.returnValue(q.reject({}));
					spyOn(TodosCollectionServiceMock, 'addTodo');
					ctrl.errors.todoCreation = null;
					ctrl.addTodo();
					scope.$apply();
				});

				it('should not try call TodosCollectionService.addTodo', function() {
					expect(TodosCollectionServiceMock.addTodo).not.toHaveBeenCalled();
				});

				it('should add an error', function() {
					expect(ctrl.errors.todoCreation).not.toBeNull();
				});
			});
		});

		describe('Invalid todo', function() {
			var newDescription = '  ';
			beforeEach(function() {
				spyOn(ApiServiceMock, 'addNewTodo');
				ctrl.newTodo.description = newDescription;
				ctrl.addTodo();
				scope.$apply();
			});

			it('should not call Api.addNewTodo', function() {
				expect(ApiServiceMock.addNewTodo).not.toHaveBeenCalled();
			});
		})
	});

});