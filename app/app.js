(function() {
	var app = angular.module('TodoApp', ['ngRoute', 'ngCookies']);

	app.config(function ($routeProvider) {
		$routeProvider.when('/', {
			controller: 'LoginCtrl',
			templateUrl: '/app/partials/login.html'
		})
	});
})();