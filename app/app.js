(function() {
	var app = angular.module('TodoApp', ['ngRoute', 'ngCookies']);

	var requireLogin = function($location, $q, $cookieStore) {
		var deferred = $q.defer();

		if (!$cookieStore.get('api_token') || !$cookieStore.get('user_id')) {
			deferred.reject();
			$location.path('/');
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	};

	app.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'LoginCtrl',
				templateUrl: '/app/partials/login.html'
			})
			.when('/todos', {
				templateUrl: '/app/partials/todos.html',
				resolve: {requireLogin: requireLogin}
			})
	});
})();