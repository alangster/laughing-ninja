
angular.module('TodoApp')
	.controller('LoginCtrl', LoginCtrl);


function LoginCtrl($cookieStore, $location, TodosCollectionService, Api) {
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

	this.$location = $location;
	this.Api = Api;
}

LoginCtrl.prototype.redirect = function() {
	this.$location.path('/todos');
}

LoginCtrl.prototype.login = function() {
	var data = {
		email: this.user.email,
		password: this.user.password
	}
	var that = this;
	
	this.Api.login(data).then(function() {
		that.errors.login = null;
		that.redirect();
	}, function() {
		that.user.password = "";
		that.errors.login = "Invalid email/password combination.";
	});
}

LoginCtrl.prototype.signUp = function() {
	var data = {
		email: this.newUser.email,
		password: this.newUser.password
	}
	var that = this;
	this.Api.signUp(data).then(function() {
		that.errors.signup = null;
		that.redirect();
	}, function(reason) {
		that.errors.signup = reason;
	});
}


