
angular.module('TodoApp')
	.controller('LoginCtrl', LoginCtrl);


function LoginCtrl($http, $cookieStore, $location) {
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

	this.$http = $http;
	this.$cookieStore = $cookieStore;
	this.$location = $location;
	this.url = "http://recruiting-api.nextcapital.com/users";
}

LoginCtrl.prototype.successResponse = function(response) {
	this.$cookieStore.put('api_token', response.api_token);
	this.$cookieStore.put('user_id', response.id);
	this.$location.path('/todos');
}

LoginCtrl.prototype.login = function() {
	var data = {
		email: this.user.email,
		password: this.user.password
	}
	var loginUrl = this.url + '/sign_in';
	var that = this;
	this.$http.post(loginUrl, data)
		.success(function(response) {
			that.errors.login = null;
			that.successResponse(response);
		})
		.error(function(response) {
			that.user.password = "";
			that.errors.login = "Invalid email/password combination.";
		})
}

LoginCtrl.prototype.signUp = function() {
	var data = {
		email: this.newUser.email,
		password: this.newUser.password
	}
	var that = this;
	this.$http.post(this.url, data)
		.success(function(response) {
			that.errors.signup = null;
			that.successResponse(response);
		})
		.error(function(response) {
			that.errors.signup = response.email[0];
		})
}


