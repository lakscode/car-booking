'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp.booking', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/booking', {
    templateUrl: 'views/booking/booking.html',
    controller: 'BookingCtrl'
  });
}])
.controller('BookingCtrl', function($scope, $http, $location, $rootScope) {
    $scope.saveEnabled=true;
	$scope.isLoggedin=true;
	
    $scope.locationsList= [];
  	$scope.API_URL = $rootScope.API_URL;
  	$scope.API_URL_OFFICES=$rootScope.API_URL_OFFICES;
	$scope.API_URL_EMPLOYEES=$rootScope.API_URL_EMPLOYEES;	
	$scope.API_URL_BOOKINGS=$rootScope.API_URL_BOOKINGS;	
	$scope.API_URL_LOCATIONS=$rootScope.API_URL_LOCATIONS;
	$scope.API_URL_CARS=$rootScope.API_URL_CARS;	  
	
		  /****** Getting employees list to populate in the dropdown ************/
	  

	console.log("Getting office locations to populate in the dropdown");
	$scope.employeesList = [];
	$http({
        method : "GET",		
        url : $scope.API_URL_EMPLOYEES
    }).then(function mySucces(response) {
        $scope.employeesList = response.data;
    }, function myError(response) {
        console.log(response.statusText);
    });
	
	

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
	
	/*********************************** getting booking list ***********************/
	
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
	
	/*********************************** getting booking list ends here ***********************/


	/*********************************** adding field for new booking ***********************/	
	
	$scope.addBooking = function(){
    var booking = {
        name: $scope.name,
		source:$scope.source,
		destination:$scope.destination,
        carnumber: $scope.carnumber,
        time: $scope.time
    };

    $scope.bookingsList.push(booking);
  }; 

  	/*********************************** removing booking ***********************/	
	
	
  $scope.removeBooking = function(index){
  
   var dataInsert = $scope.bookingsList[index];
   
  console.log(dataInsert._id);
	var postUrl = $scope.API_URL_BOOKINGS + '/' + dataInsert._id
		var res = $http.delete(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
			$scope.message = data;
			$location.path('/booking');
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
		
		
    $scope.bookingsList.splice(index, 1);
  };  
  

/*********************************** cheching whether booking exists  based on the given car number and booking time ***********************/	
		
  	$scope.checkBooking = function(index)
	{
	
	var dataInsert = $scope.bookingsList[index];
	var carNumber = dataInsert.carnumber;
	var bookingTime = dataInsert.time;
	var postUrl = $scope.API_URL_BOOKINGS + "/check";
			
	console.log("carNumber " + carNumber);
	console.log("bookingTime " + bookingTime);
	console.log("carNumber " + carNumber);
	console.log("bookingTime " + bookingTime);
	
	var dataCheck = { time:bookingTime, carnumber:carNumber};
	var res = $http.post(postUrl, dataCheck);
	res.success(function(data, status, headers, config) {
	console.log("booking check result");
	console.log(data);
	if(data == null)
		{
			$scope.saveEnabled=false;
			alert("Available");	
			return true;
		}
		else
		{
			alert("Already the care is booked for the selected time");
			return false;
		}
	});
	
	};
	
/*********************************** saving new bookings ***********************/		
	$scope.saveBooking = function(index)
	{
    var dataInsert = $scope.bookingsList[index];
	var carNumber = dataInsert.carnumber;
	var bookingTime = dataInsert.time;
	var postUrl = "";
	if(dataInsert._id)
	{
		console.log(dataInsert._id);
		postUrl = $scope.API_URL_BOOKINGS + '/' + dataInsert._id
		var res = $http.put(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
			$scope.message = data;
			$location.path('/booking');
			});
			res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
			});
	}
	else
	{
		postUrl = $scope.API_URL_BOOKINGS;
		console.log(postUrl);
		var res = $http.post(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
			$scope.message = data;
			$location.path('/booking');
			});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
			});
	}
			
			
	};
		
		
/*********************************** filtering data **********************/	
  
$scope.searchFilter = function (booking) {
    var keyword = new RegExp($scope.nameFilter, 'i');
    return !$scope.nameFilter || keyword.test(booking.name) ;
};
  

});
