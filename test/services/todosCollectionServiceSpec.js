describe('TodosCollectionService', function() {
	var TodosCollectionService, todos;

	beforeEach(function() {
		module('TodoApp');

		inject(function(_TodosCollectionService_) {
			TodosCollectionService = _TodosCollectionService_;
		});
		todos = [
			{id: 1, description: 'Floss', is_complete: false},
			{id: 2, description: 'Shovel driveway', is_complete: true},
			{id: 3, description: 'Drink coffee', is_complete: true}
		];
		TodosCollectionService.setTodos(todos);
	});

	describe('setTodos', function() {
		it('should return itself', function() {
			expect(TodosCollectionService.setTodos(todos)).toEqual(TodosCollectionService);
		});
	});

	describe('getTodos', function() {
		it('should return all previously set todos', function() {
			expect(TodosCollectionService.getTodos()).toEqual(todos);
		});
	});

	describe('addTodo', function() {
		var newTodo;
		beforeEach(function() {
			newTodo = {id: 4, description: 'Call home', is_complete: false};	
			TodosCollectionService.addTodo(newTodo);
		});

		it('should return itself', function() {
			expect(TodosCollectionService.addTodo(newTodo)).toEqual(TodosCollectionService);
		});

		it('should add another todo to the collection', function() {
			expect(TodosCollectionService.getTodos()).toContain(newTodo);
		});

		it('should increment the incomplete todo count', function() {
			expect(TodosCollectionService.getTodoCounts()).toEqual({complete: 2, incomplete: 2});
		});
	});

});