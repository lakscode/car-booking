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
	$scope.saveEnabled=true;
	$scope.locationsList= [];
	$scope.addBook=0;
	$scope.API_URL = $rootScope.API_URL;
  	$scope.API_URL_OFFICES=$rootScope.API_URL_OFFICES;
	$scope.API_URL_EMPLOYEES=$rootScope.API_URL_EMPLOYEES;	
	$scope.API_URL_BOOKINGS=$rootScope.API_URL_BOOKINGS;	
	$scope.API_URL_LOCATIONS=$rootScope.API_URL_LOCATIONS;
	$scope.API_URL_CARS=$rootScope.API_URL_CARS;	  
	
	 /****** Getting office locations to populate in the dropdown ************/
	  

	console.log("Getting employees to populate in the dropdown");
	$scope.employeesList = [];
	$http({
        method : "GET",		
        url : $scope.API_URL_EMPLOYEES
    }).then(function mySucces(response) {
        $scope.employeesList = response.data;
    }, function myError(response) {
        console.log(response.statusText);
    });
	
	
	/*********************************** location ***********************/
	
	
	/******************** Getting office locations ************************/	  
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
	
	
	/*********************************** location ***********************/
	
	
/******************** Getting locations ************************/	  
	  
	  

	
	$scope.locationsList = [];
	console.log("Before http request");
	$http({
        method : "GET",		
        url : $scope.API_URL_LOCATIONS
    }).then(function mySucces(response) {
		console.log("In success");
		console.log(response);
        $scope.locationsList = response.data;
		
		console.log($scope.locationsList);
    }, function myError(response) {
        console.log(response.statusText);
    });
	
	
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
	
	
	/*********************************** location ***********************/
	
	
	

	
	$scope.bookingsList = [];
	console.log("Before http request");
	$http({
        method : "GET",		
        url : $scope.API_URL_BOOKINGS
    }).then(function mySucces(response) {
		console.log("In success");
		console.log(response);
        $scope.bookingsList = response.data;
		
		console.log($scope.bookingsList);
    }, function myError(response) {
        console.log(response.statusText);
    });
	
	console.log("After http request");
	console.log($scope.bookingsList);
	


  
  
  $scope.searchFilter = function (booking) {
 
 $scope.filterWord = $scope.getEmployeeNameById($scope.nameFilter);
    var keyword = new RegExp($scope.filterWord, 'i');
    return !$scope.filterWord || keyword.test(booking.name) ;
};
  

$scope.getSourceLocById = function(sourceLocId)
{
	var sourceLocName = '';
	angular.forEach($scope.officeLocationsList, function (officeLoc) {
		if (officeLoc._id == sourceLocId)
		{
			sourceLocName =  officeLoc.location;
		}
	});
	return sourceLocName;
};
 
 
$scope.getDestinationLocById = function(destLocId)
{
	var destLocName = '';
	angular.forEach($scope.locationsList, function (location) {
		if (location._id == destLocId)
		{
			destLocName =  location.location;
		}
	});
	return destLocName;
};
 
 
$scope.getCarNumberById = function(carNumberId)
{
	var carNumberDesc = '';
	angular.forEach($scope.carNumbersList, function (carNumber) {
		if (carNumber._id == carNumberId)
		{
			carNumberDesc =  carNumber.carnumber;
		}
	});
	return carNumberDesc;
};
 
$scope.getEmployeeNameById = function(employeeId)
{
	var employeeName = '';
	angular.forEach($scope.employeesList, function (employee) {
		if (employee._id == employeeId)
		{
			employeeName =  employee.name;
		}
	});
	return employeeName;
}; 

$scope.addBooking = function()
{
$scope.addBook=1;
}; 


});
