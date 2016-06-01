'use strict';

angular.module('myApp.travelroute', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/travelroute', {
    templateUrl: 'views/travelroute/travelroute.html',
    controller: 'TravelrouteCtrl'
  });
}])

.controller('TravelrouteCtrl', function($scope, $http, $location, $rootScope, $window) {
console.log("in TravelrouteCtrl ctrl");

localStorage.setItem("travelRouteDetailsSelId", '');

	$scope.API_URL_TRAVELROUTES=$rootScope.API_URL_TRAVELROUTES;

	
	$scope.travelroutesList = [];
	console.log("Before http request");
	$http({
        method : "GET",		
        url : $scope.API_URL_TRAVELROUTES
    }).then(function mySucces(response) {
		console.log("In success");
		console.log(response);
        $scope.travelroutesList = response.data;
			console.log($scope.travelroutesList);
    }, function myError(response) {
        console.log(response.statusText);
    });
	
	console.log("After http request");
	console.log($scope.travelroutesList);
	
	
	$scope.addTravelroute = function(){
    var travelroute = {
        name: $scope.name,
		city:$scope.city,
        state: $scope.state
    };

    $scope.travelroutesList.push(travelroute);
  }; 

    $scope.removeTravelroute = function(index){
   var dataDelete = $scope.locationsList[index];
  postUrl = $scope.API_URL_LOCATIONS + '/' + dataDelete._id
		var res = $http.delete(postUrl, dataDelete);
		res.success(function(data, status, headers, config) {
		$location.path('/travelroute');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
		
    $scope.travelroutesList.splice(index, 1);
  }; 
  
  	
	$scope.saveTravelroute = function(index){
	console.log(index);
    var dataInsert = $scope.travelroutesList[index];

	var postUrl = "";
	if(dataInsert._id)
	{
	console.log(dataInsert._id);
	postUrl = $scope.API_URL_TRAVELROUTES + '/' + dataInsert._id
		var res = $http.put(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
		$location.path('/travelroute');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
		
	}
	else
	{
	postUrl = $scope.API_URL_TRAVELROUTES;
		var res = $http.post(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
		$location.path('/travelroute');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
		
		
	}
	

		
  }; 
  
  
  $scope.openNav = function(index) {
  
      var dataInsert = $scope.travelroutesList[index];
  event.preventDefault();
      $rootScope.$evalAsync(function() {
	    localStorage.setItem("travelRouteDetailsSelRoute", dataInsert.name);
	  localStorage.setItem("travelRouteDetailsSelId", dataInsert._id);
        $location.path('/travelroutedetails');
      });

	  
  console.log("open nva");
  	$location.path('/travelroutedetails');

    //document.getElementById("myNav").style.display = "block";
};

$scope.closeNav = function() {
    document.getElementById("myNav").style.display = "none";
};


});