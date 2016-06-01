'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp.header', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/header', {
    templateUrl: 'views/header/header.html',
    controller: 'HeaderCtrl'
  });
}])
.controller('HeaderCtrl', function($scope, $http, $location, $rootScope) {
  	
	$rootScope.isLoggedin = localStorage.getItem('isLoggedin');
	$rootScope.username = 	localStorage.getItem('currentUser');
	
  
$rootScope.$watch('isLoggedin', function(){
console.log("is logged in");

 	
	$scope.isLoggedin = localStorage.getItem('isLoggedin');
	$scope.username = 	localStorage.getItem('currentUser');
	
   console.log($scope.isLoggedin);
  console.log($scope.username);
  
  /*********** for development use. not to logout when refreshing the page while testing ********/
console.log("Is logged in " + $scope.isLoggedin);


 if($scope.isLoggedin == 1)
  {
   $scope.isLoggedin = $rootScope.isLoggedin;
	$scope.username = $rootScope.username;
		$scope.isLoggedin = localStorage.getItem('isLoggedin');
	$scope.username = 	localStorage.getItem('currentUser');
  }
  else
  {
  console.log("Islogged in is false 1");
  $location.path('/login');

  }
});
  if($scope.isLoggedin == 1)
  {
   $scope.isLoggedin = $rootScope.isLoggedin;
  $scope.username = $rootScope.username;
  	$scope.isLoggedin = localStorage.getItem('isLoggedin');
	$scope.username = 	localStorage.getItem('currentUser');
  }
  else
  {
  
    console.log("Islogged in is false 2");
  $location.path('/login');

  }

});
