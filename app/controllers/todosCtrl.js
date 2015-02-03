
angular.module('TodoApp')
	.controller('TodosCtrl', TodosCtrl);


function TodosCtrl($cookieStore, $http, TodosCollectionService) {

	this.todos = TodosCollectionService.getTodos();
	this.$http = $http;
	this.$cookieStore = $cookieStore;
	this.url = 'http://recruiting-api.nextcapital.com/users/' + $cookieStore.get('user_id') + '/todos';

	var that = this;
	(function init() {
		that.$http.get(that.url + '.json?api_token=' + $cookieStore.get('api_token'))
			.success(function(response){
				TodosCollectionService.setTodos(response);
			})
			.error(function(response){
				console.log(response);
			})
	})();
}