'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login.html',
    controller: 'LoginCtrl'
  });
}])
.controller('LoginCtrl', function($scope, $http, $location, $rootScope, $window) {
	$scope.user= {email:'', password:''};
	$scope.message ='';

	$scope.API_URL_EMPLOYEES = $rootScope.API_URL_EMPLOYEES;	

  	$scope.loginUser = function(){

		var postUrl = $scope.API_URL_EMPLOYEES + "/login";

		var dataInsert = { name:$scope.user.email, password:$scope.user.password};
		var res = $http.post(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
			console.log(data);
			if(data == null)
			{
			$scope.message = "Check credentials";
			}
			else
			{
			$rootScope.isLoggedin = 1;
			$rootScope.username=$scope.user.email;
			$window.sessionStorage.currentUser = $scope.user.email;
			
			localStorage.setItem('isLoggedin', 1);
			localStorage.setItem('currentUser', $scope.user.email);
	
	
			$window.sessionStorage.isLoggedin = 1;
			console.log("Login successfull");
			$scope.message = "Login Successfull";
			$location.path('/home');
			}
		});
			res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
  }); 
  };

});