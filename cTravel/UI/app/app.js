'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.header',
  'myApp.login',
  'myApp.home',
  'myApp.cars',
  'myApp.location',
  'myApp.office',  
  'myApp.booking',
  'myApp.employee',
  'myApp.grid',  
  'myApp.report',   
'myApp.travelroute',  
'myApp.travelroutedetails',  
  'angularjs-datetime-picker'
])
.config(['$routeProvider', function($routeProvider) {

//$routeProvider.otherwise({redirectTo: '/login'});
}])
.constant("config", {
        "apiUrl": "http://localhost:3000"
    })
.run(function($rootScope,  $window) {
    $rootScope.test = new Date();
	$rootScope.API_URL = "http://localhost:3000";
	$rootScope.API_URL_CARS = $rootScope.API_URL + "/cars";
	$rootScope.API_URL_OFFICES = $rootScope.API_URL + "/offices";
	$rootScope.API_URL_LOCATIONS = $rootScope.API_URL + "/locations";
	$rootScope.API_URL_EMPLOYEES = $rootScope.API_URL + "/users";
	$rootScope.API_URL_BOOKINGS = $rootScope.API_URL + "/bookings";
	$rootScope.API_URL_TRAVELROUTES = $rootScope.API_URL + "/travelroutes";	

	$rootScope.API_URL_TRAVELROUTESDETAILS = $rootScope.API_URL + "/travelroutesdetails";	
	$rootScope.API_URL_TRAVELROUTESDETAILS_By_ROUTEID = $rootScope.API_URL + "/travelroutesdetails/routeId";	
		
	
	
	
//	$rootScope.isLoggedin = 0;
//	$window.sessionStorage.currentUser = "";
//	$window.sessionStorage.isLoggedin = 0;	
//	localStorage.setItem('isLoggedin', 0);
//	localStorage.setItem('currentUser', '');
})
.controller('myFirstController', function($scope, $http, $rootScope, $window,$location) {

//$rootScope.isLoggedin = 0;
if($window.sessionStorage.isLoggedin > 0)
{
	$rootScope.username = 	$window.sessionStorage.currentUser;
	$rootScope.isLoggedin = $window.sessionStorage.isLoggedin;
	
	$rootScope.isLoggedin = localStorage.getItem('isLoggedin');
	$rootScope.username = 	localStorage.getItem('currentUser');
	
}


$scope.logoutUser = function(){
	console.log("Logoutuser function");
	$rootScope.username='';
	$rootScope.isLoggedin = 0;
	$window.sessionStorage.currentUser = "";
	$window.sessionStorage.isLoggedin = 0;	
	localStorage.setItem('isLoggedin', 0);
	localStorage.setItem('currentUser', '');
	$location.path('/login');
	};
	

});



