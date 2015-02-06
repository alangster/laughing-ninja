
angular.module('TodoApp')
	.service('Api', Api);


function Api($http, $q) {
	
	var loggedIn = false;
	var token, userId;
	var baseUrl = 'http://recruiting-api.nextcapital.com/users/';
	var todoSuffix = '/todos';

	function storeInfo(apiToken, id) {
		token = apiToken;
		userId = id;
	};

	function todoData(todo) {
		return {'api_token': token, 'todo': { 'description': todo.description, 'is_complete': todo.is_complete } };	
	}

	this.isLoggedIn = function() {
		return loggedIn;
	}

	this.login = function(data) {
		var loginUrl = baseUrl + 'sign_in';
		var deferred = $q.defer();
		$http.post(loginUrl, data)
			.success(function(response) {
				storeInfo(response.api_token, response.id);
				loggedIn = true;
				deferred.resolve();
			})
			.error(function(response) {
				deferred.reject();
			});
		return deferred.promise;
	}

	this.signUp = function(data) {
		var deferred = $q.defer();
		$http.post(baseUrl, data)
			.success(function(response) {
				storeInfo(response.api_token, response.id);
				loggedIn = true;
				deferred.resolve();
			})
			.error(function(response) {
				deferred.reject(response.email[0]);
			});
		return deferred.promise;
	}

	this.logout = function() {
		var logoutUrl = baseUrl + 'sign_out';
		var data = {
			'api_token': token,
			'user_id': userId
		}
		var deferred = $q.defer();
		$http.delete(logoutUrl, data)
			.success(function(response) {
				token = null;
				userId = null;
				loggedIn = false;
				deferred.resolve();
			})
			.error(function(response) {
				deferred.reject();
			});
		return deferred.promise;
	}

	this.fetchTodos = function() {
		var todosUrl = baseUrl + userId + todoSuffix + '.json?api_token=' + token;
		var deferred = $q.defer();
		$http.get(todosUrl)
			.success(function(response) {
				deferred.resolve(response);
			})
			.error(function(response) {
				deferred.reject();
			});
		return deferred.promise;
	}

	this.addNewTodo = function(todo) {
		var newUrl = baseUrl + userId + todoSuffix;
		var data = {
			'api_token': token,
			'todo': { 'description': todo }
		}
		var deferred = $q.defer();
		$http.post(newUrl, data)
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(response) {
				deferred.reject();
			});
		return deferred.promise;
	}

	this.updateTodo = function(todo) {
		var updateUrl = baseUrl + userId + todoSuffix + '/' + todo.id;

		var deferred = $q.defer();
		$http.put(updateUrl, todoData(todo))
			.success(function(response) {
				deferred.resolve();
			}) 
			.error(function(response) {
				deferred.reject();
			});
		return deferred.promise;
	}

}