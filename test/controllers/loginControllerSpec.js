describe('LoginCtrl', function() {
	var scope, controller, ctrl, ApiServiceMock, q;

	beforeEach(function() {
		module('TodoApp');

		inject(function($rootScope, $controller, $q) {
			scope = $rootScope.$new();
			controller = $controller;
			q = $q;
		});
		
		ApiServiceMock = {
			login: function() {},
			signUp: function() {}
		};
		ctrl = controller('LoginCtrl', {
			$scope: scope,
			Api: ApiServiceMock
		});
	});

	describe('Initialization', function() {
		it('Should instantiate a user object', function() {
			expect(ctrl.user).toEqual({
				email: '', 
				password: ''
			});
		});

		it('Should instantiate a newUser object', function() {
			expect(ctrl.newUser).toEqual({
				email: '',
				password: ''
			});
		});

		it('Should have no errors', function() {
			expect(ctrl.errors).toEqual({
				login: null,
				signup: null
			});
		})
	});

	describe('Login attempt', function() {
		describe('Successful attempt', function() {
			beforeEach(function() {
				spyOn(ApiServiceMock, 'login').and.returnValue(q.when({}));
				
				ctrl.user = {
					email: 'joe@aol.com',
					password: 'boom'
				};
				ctrl.errors.login = 'Unsucessful';
				ctrl.login();
				scope.$apply();
			});

			it('Should call Api.login() with the correct argument', function() {
				expect(ApiServiceMock.login).toHaveBeenCalledWith(ctrl.user);
			});

			it('Resets login errors to null', function() {
				expect(ctrl.errors.login).toBeNull();
			});
		});

		describe('Unsucessful attempt', function() {
			beforeEach(function() {
				spyOn(ApiServiceMock, 'login').and.returnValue(q.reject({}));
				
				ctrl.user = {
					email: 'joe@aol.com',
					password: 'boom'
				};
				ctrl.errors.login = null;
				ctrl.login();
				scope.$apply();
			});

			it('Should clear the user password', function() {
				expect(ctrl.user.password).toEqual('');
			});

			it('Should add an error message', function() {
				expect(ctrl.errors.login).not.toBeNull();
			})
		});
	});

	describe('Signup attempt', function() {
		beforeEach(function() {
			ctrl.newUser = {
				email: 'joe@aol.com',
				password: 'boom'
			};
		});

		describe('Successful attempt', function() {
			beforeEach(function() {
				spyOn(ApiServiceMock, 'signUp').and.returnValue(q.when({}));
				ctrl.errors.signup = 'Could not sign up';
				ctrl.signUp();
				scope.$apply()
			});

			it('Should call Api.signUp() with the correct data', function() {
				expect(ApiServiceMock.signUp).toHaveBeenCalledWith(ctrl.newUser);
			});	

			it('Should clear any errors', function() {
				expect(ctrl.errors.signup).toBeNull();
			});
		});

		describe('Unsucessful attempt', function() {
			beforeEach(function() {
				spyOn(ApiServiceMock, 'signUp').and.returnValue(q.reject({}));
				ctrl.errors.signup = null;
				ctrl.signUp();
				scope.$apply();
			});

			it('Should clear the password', function() {
				expect(ctrl.newUser.password).toEqual('');
			});

			it('Should add an error message', function() {
				expect(ctrl.errors.signup).not.toBeNull();
			});
		});
	});
});