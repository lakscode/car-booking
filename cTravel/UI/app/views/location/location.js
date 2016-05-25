'use strict';

angular.module('myApp.location', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/location', {
    templateUrl: 'views/location/location.html',
    controller: 'LocationCtrl'
  });
}])

.controller('LocationCtrl', function($scope, $http, $location, $rootScope) {
console.log("in LocationCtrl ctrl");

	$scope.API_URL_LOCATIONS=$rootScope.API_URL_LOCATIONS;

	
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
	
	console.log("After http request");
	console.log($scope.locationsList);
	
	
	$scope.addLocation = function(){
    var location = {
        location: $scope.location,
		city:$scope.city,
        state: $scope.state
    };

    $scope.locationsList.push(location);
  }; 

  $scope.removeLocation = function(index){
    $scope.locationsList.splice(index, 1);
  };  
  
  	
	$scope.saveLocation = function(index){
	console.log(index);
    var dataInsert = $scope.locationsList[index];

	var postUrl = "";
	if(dataInsert._id)
	{
	console.log(dataInsert._id);
	postUrl = $scope.API_URL_LOCATIONS + '/' + dataInsert._id
		var res = $http.put(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
		$location.path('/locations');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
		
	}
	else
	{
	postUrl = $scope.API_URL_LOCATIONS;
		var res = $http.post(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
		$location.path('/locations');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
		
		
	}
	

		
  }; 
  
});