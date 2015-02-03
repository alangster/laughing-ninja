
angular.module('TodoApp')
	.controller('TodosCtrl', TodosCtrl);


function TodosCtrl($cookieStore, $http) {
	
	this.todos = [];
	this.$http = $http;
	this.$cookieStore = $cookieStore;
	this.url = 'http://recruiting-api.nextcapital.com/users/' + $cookieStore.get('user_id') + '/todos';

	var that = this;
	(function init() {
		console.log("DING");
		that.$http.get(that.url + '.json?api_token=' + $cookieStore.get('api_token'))
			.success(function(response){
				console.log(response);
			})
			.error(function(response){
				console.log(response);
			})
	})();
}