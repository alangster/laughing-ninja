
angular.module('TodoApp')
	.controller('LoginCtrl', LoginCtrl);


function LoginCtrl($location, Api) {
	this.user = {
		email: "",
		password: ""
	};

	this.newUser = {
		email: "",
		password: ""
	};

	this.errors = {
		login: null,
		signup: null
	};

	var redirect = function() {
		if ($location.path() === '/') {
			$location.path('/todos');
		} else {
			$location.path('/');
		}
	};

	this.login = function() {
		var that = this;
	
		Api.login(this.user).then(function() {
			that.errors.login = null;
			redirect();
		}, function() {
			that.user.password = "";
			that.errors.login = "Invalid email/password combination.";
		});	
	};

	this.signUp = function() {
		var that = this;

		Api.signUp(this.newUser).then(function() {
			that.errors.signup = null;
			redirect();
		}, function(reason) {
			that.errors.signup = reason;
		});
	};

	this.logout = function() {
		Api.logout().then(function() {
			redirect();
		}, function() {});
	}
}

