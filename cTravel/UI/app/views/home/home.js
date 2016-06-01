'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp.home', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home/home.html',
    controller: 'HomeCtrl'
  });
}])
.controller('HomeCtrl', function($scope, $http, $location,$rootScope) {
  
  	$scope.API_URL = $rootScope.API_URL;
  	$scope.API_URL_OFFICES=$rootScope.API_URL_OFFICES;
	$scope.API_URL_EMPLOYEES=$rootScope.API_URL_EMPLOYEES;	
	$scope.API_URL_BOOKINGS=$rootScope.API_URL_BOOKINGS;	
	$scope.API_URL_LOCATIONS=$rootScope.API_URL_LOCATIONS;
	$scope.API_URL_CARS=$rootScope.API_URL_CARS;	  
	$scope.API_URL_TRAVELROUTES=$rootScope.API_URL_TRAVELROUTES;	
	
	/************************GETITNG ALL BOOKINGS **********************************/
	
	$scope.bookingList = [];
	console.log("Before http request");
	$http({
        method : "GET",		
        url : $scope.API_URL_BOOKINGS
    }).then(function mySucces(response) {
        $scope.bookingList = response.data;
    }, function myError(response) {
        console.log(response.statusText);
    });
	
/***************** Getting employees list ***********/

	
	$scope.employeesList = [];
	console.log("Before http request");
	$http({
        method : "GET",		
        url : $scope.API_URL_EMPLOYEES
    }).then(function mySucces(response) {
		console.log("In success");
		console.log(response);
        $scope.employeesList = response.data;
			console.log($scope.employeesList);
    }, function myError(response) {
        console.log(response.statusText);
    });
	
	
	$scope.getEmployeeNamebyId = function(employeeId)
	{
	console.log("Employee id " + employeeId);
	var employeeName = '';
	angular.forEach($scope.employeesList, function (employee) {
		if (employee._id == employeeId)
		{
			employeeName =  employee.name;
		}
	});
	return employeeName;
	}
	
	
/***************** Getting employees list ***********/	
	
	

/****** Getting office locations to populate in the dropdown ************/
	  

	console.log("Getting office locations to populate in the dropdown");
	$scope.officeLocationsList = [];
	$http({
        method : "GET",		
        url : $scope.API_URL_OFFICES
    }).then(function mySucces(response) {
        $scope.officeLocationsList = response.data;
    }, function myError(response) {
        console.log(response.statusText);
    });
	
	
	$scope.getOfficeLocbyId = function(officeLocId)
	{
	var oficeLocation = '';
	angular.forEach($scope.officeLocationsList, function (officeLoc) {
		if (officeLoc._id == officeLocId)
		{
			oficeLocation =  officeLoc.location;
		}
	});
	return oficeLocation;
	}
	
	
	
/******************** Getting locations ************************/	  
	  
	$scope.locationsList = [];
	$http({
        method : "GET",		
        url : $scope.API_URL_LOCATIONS
    }).then(function mySucces(response) {
        $scope.locationsList = response.data;
    }, function myError(response) {
        console.log(response.statusText);
    });

	
		$scope.getLocbyId = function(destLocId)
	{
	var destLocation = '';
	angular.forEach($scope.locationsList, function (destLoc) {
		if (destLoc._id == destLocId)
		{
			destLocation =  destLoc.location;
		}
	});
	return destLocation;
	}
	
	
	/*********************************** location ***********************/
	
	/******************** Getting car numbers ************************/	  

	$scope.carNumbersList = [];
	$http({
        method : "GET",		
        url : $scope.API_URL_CARS
    }).then(function mySucces(response) {
        $scope.carNumbersList = response.data;
    }, function myError(response) {
        console.log(response.statusText);
    });
	
	
	$scope.getCarNumberbyId = function(carNumberId)
	{
	var carNumberDetails = '';
	angular.forEach($scope.carNumbersList, function (carNumber) {
		if (carNumber._id == carNumberId)
		{
			carNumberDetails =  carNumber.carnumber;
		}
	});
	return carNumberDetails;
	};
		/******************** Getting routes list ************************/	  

	$scope.travelRoutesList = [];
	$http({
        method : "GET",		
        url : $scope.API_URL_TRAVELROUTES
    }).then(function mySucces(response) {
        $scope.travelRoutesList = response.data;
    }, function myError(response) {
        console.log(response.statusText);
    });

	
	/************** search filter ************/
	
	$scope.searchFilter = function (booking) {
		var keyword = new RegExp($scope.nameFilter, 'i');
		return !$scope.nameFilter || keyword.test(booking.name) ;
	};
  	
	
  
});