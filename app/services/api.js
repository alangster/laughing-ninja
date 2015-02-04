
angular.module('TodoApp')
	.service('Api', Api);


function Api($http, $q) {
	
	var token, userId;
	var baseUrl = 'http://recruiting-api.nextcapital.com/users';
	var loginUrl = baseUrl + '/sign_in';

	function storeInfo(apiToken, id) {
		token = apiToken;
		userId = id;
	};

	this.login = function(data) {
		var deferred = $q.defer();
		$http.post(loginUrl, data)
			.success(function(response) {
				storeInfo(response.api_token, response.user_id);
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
				storeInfo(response.api_token, response.user_id);
				deferred.resolve();
			})
			.error(function(response) {
				deferred.reject(response.email[0]);
			});
		return deferred.promise;
	}

}