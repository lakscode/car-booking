'use strict';

angular.module('myApp.cars', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cars', {
    templateUrl: 'views/car/car.html',
    controller: 'CarCtrl'
  });
}])

.controller('CarCtrl', function($scope, $http, $location, $rootScope) {
console.log("in car ctrl");

	$scope.API_URL = $rootScope.API_URL;
  	$scope.API_URL_OFFICES=$rootScope.API_URL_OFFICES;
	$scope.API_URL_CARS=$rootScope.API_URL_CARS;	  


	$scope.officeLocationsList=[];
	 

	$http({
        method : "GET",		
        url : $scope.API_URL_OFFICES
    }).then(function mySucces(response) {
        $scope.officeLocationsList = response.data;
    }, function myError(response) {
        console.log(response.statusText);
    });
	 
	 
	$scope.carsList = [];
	console.log("Before http request");
	$http({
        method : "GET",		
        url : $scope.API_URL_CARS
    }).then(function mySucces(response) {
        $scope.carsList = response.data;
    }, function myError(response) {
        console.log(response.statusText);
    });
	
	
	
	$scope.addCar = function(){
    var car = {
        name: $scope.name,
		phone:$scope.phone,
        carnumber: $scope.carnumber,
        location: $scope.location
    };
    $scope.carsList.push(car);
	}; 

  $scope.removeCar = function(index){
	console.log($scope.carsList);
	console.log(index);

	var dataInsert = $scope.carsList[index];
    $scope.carsList.splice(index, 1);
	console.log($scope.carsList);
	console.log(index);
	console.log(dataInsert);
	var postUrl = "";

	console.log(dataInsert._id);
	postUrl = $scope.API_URL_CARS + '/' + dataInsert._id
		var res = $http.delete(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
		$location.path('/cars');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
	
  };  
    	
	$scope.saveCar = function(index){
	console.log(index);
    var dataInsert = $scope.carsList[index];

	console.log("saving data");
	console.log(dataInsert);
	
	var postUrl = "";
	if(dataInsert._id)
	{
		console.log(dataInsert._id);
		postUrl = $scope.API_URL_CARS + '/' + dataInsert._id
		var res = $http.put(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
		$location.path('/cars');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
	}
	else
	{
		postUrl = $scope.API_URL_CARS;
		var res = $http.post(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
		$location.path('/cars');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
	}
}; 
    
});