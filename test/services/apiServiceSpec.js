describe('Api', function() {

	var Api, httpBackend, q;
	var baseUrl = 'http://recruiting-api.nextcapital.com/users/';
	var loginUrl = baseUrl + 'sign_in';
	var successResponse = {id: 1, api_token: 'token', todos: []};
	var userData = { email: 'joe@aol.com', password: 'boom' };

	beforeEach(function() {
		module('TodoApp');
		inject(function(_Api_, $httpBackend) {
			Api = _Api_;
			httpBackend = $httpBackend;
		});
	});

	describe('initialization', function() {
		describe('isLoggedIn', function() {
			it('should be false', function() {
				expect(Api.isLoggedIn()).toBeFalsy();
			});
		});
	});

	describe('signUp', function() {
		describe('successful attempt', function() {
			beforeEach(function() {
				httpBackend.when('POST', baseUrl, userData)
					.respond(successResponse);
			});

			it('should be logged in', function() {
				Api.signUp(userData);
				httpBackend.flush();
				expect(Api.isLoggedIn()).toBeTruthy();
			});
		});

		describe('unsuccessful attempt', function() {
			var badRequestResponse = {email: ['already taken']};
			beforeEach(function() {
				httpBackend.when('POST', baseUrl, userData)
					.respond(500, badRequestResponse);
			});

			it('should not be logged in', function() {
				Api.signUp(userData);
				httpBackend.flush();
				expect(Api.isLoggedIn()).toBeFalsy();
			});

		});
	});

	describe('login', function() {

		describe('successful attempt', function() {	
			beforeEach(function() {
				httpBackend.when('POST', loginUrl, userData)
					.respond(successResponse);
			});

			it('should be logged in', function() {
				Api.login(userData);
				httpBackend.flush();
				expect(Api.isLoggedIn()).toBeTruthy();
			});
		});

		describe('unsuccessful attempt', function() {
			beforeEach(function(){
				httpBackend.when('POST', loginUrl, userData)
					.respond(500);
			});

			it('should not be logged in', function() {
				Api.login(userData);
				httpBackend.flush();
				expect(Api.isLoggedIn()).toBeFalsy();
			});		
		});
	});

	var preTestLogIn = function() {
		httpBackend.when('POST', loginUrl, userData)
			.respond(successResponse);
		Api.login(userData)
		httpBackend.flush();
	};

	describe('fetchTodos', function() {
		beforeEach(function() {
			preTestLogIn();
		});

		it('should make to call for all todos', function() {
			httpBackend.expectGET(baseUrl + 1 + '/todos.json?api_token=token')
				.respond([{}, {}]);
			Api.fetchTodos();
			httpBackend.flush();
		});
	});

	describe('addNewTodo', function() {
		beforeEach(function() {
			preTestLogIn();
		});

		it('should make the appropriate post', function() {
			var todoDescription = 'something';
			var requestData = {'api_token': 'token', 'todo': {'description': todoDescription} }
			httpBackend.expectPOST(baseUrl + '1/todos', requestData)
				.respond({})
			Api.addNewTodo(todoDescription);
			httpBackend.flush();
		});
	});

	describe('updateTodo', function() {
		beforeEach(function() {
			preTestLogIn();
		});

		it('should make the appropriate post', function() {
			var todo = {id: 1, description: 'todo', is_complete: true};
			var todoData = {'api_token': 'token', 'todo': {'description': todo.description, 'is_complete': todo.is_complete} };
			httpBackend.expectPUT(baseUrl + '1/todos/1', todoData)
				.respond({});
			Api.updateTodo(todo);
			httpBackend.flush();
		});
	});

});