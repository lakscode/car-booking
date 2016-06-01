'use strict';

angular.module('myApp.travelroutedetails', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/travelroutedetails', {
    templateUrl: 'views/travelroutedetails/travelroutedetails.html',
    controller: 'TravelrouteDetailsCtrl'
  });
}])

.controller('TravelrouteDetailsCtrl', function($scope, $http, $location, $rootScope) {
console.log("in TravelrouteDetailsCtrl ctrl");
$scope.selId = localStorage.getItem("travelRouteDetailsSelId");
console.log("TravelRouteDetailsSelId " + $scope.selId);

$scope.selectedRoute = localStorage.getItem("travelRouteDetailsSelRoute");
console.log("TravelRouteDetailsSelIroute " + $scope.selectedRoute);

	$scope.API_URL_TRAVELROUTESDETAILS=$rootScope.API_URL_TRAVELROUTESDETAILS;
$scope.API_URL_TRAVELROUTESDETAILS_By_ROUTEID = $rootScope.API_URL_TRAVELROUTESDETAILS_By_ROUTEID;
	
	$scope.travelroutedetailsList = [];
	console.log("Before http request");
	
	var dataInsert = { routeId:$scope.selId};
		var res = $http.post($scope.API_URL_TRAVELROUTESDETAILS_By_ROUTEID , dataInsert);
		
		res.success(function(data, status, headers, config) {
			 $scope.travelroutedetailsList = data;
			});

		
		/*
	$http({
        method : "GET",		
        url : $scope.API_URL_TRAVELROUTESDETAILS_By_ROUTEID 
    }).then(function mySucces(response) {
		console.log("In success");
		console.log(response);
        $scope.travelroutedetailsList = response.data;
			console.log($scope.travelroutedetailsList);
    }, function myError(response) {
        console.log(response.statusText);
    });
	
	*/
	console.log("After http request");
	console.log($scope.travelroutedetailsList);
	
	
	$scope.addTravelroute = function(){
    var travelroute = {
        name: $scope.name,
		routeId:$scope.selId,
        priority: $scope.priority
    };

    $scope.travelroutedetailsList.push(travelroute);
  }; 

    $scope.removeTravelroute = function(index){
   var dataDelete = $scope.locationsList[index];
  postUrl = $scope.API_URL_TRAVELROUTESDETAILS + '/' + dataDelete._id
		var res = $http.delete(postUrl, dataDelete);
		res.success(function(data, status, headers, config) {
		//$location.path('/travelroutedetails');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
		
    $scope.travelroutedetailsList.splice(index, 1);
	return false;
  }; 
  
  	
	$scope.saveTravelroute = function(index){
	console.log(index);
    var dataInsert = $scope.travelroutedetailsList[index];

	var postUrl = "";
	if(dataInsert._id)
	{
	console.log(dataInsert._id);
	postUrl = $scope.API_URL_TRAVELROUTESDETAILS + '/' + dataInsert._id
		var res = $http.put(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
		//$location.path('/travelroutedetails');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
		
	}
	else
	{
	postUrl = $scope.API_URL_TRAVELROUTESDETAILS;
		var res = $http.post(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
		//$location.path('/travelroutedetails');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
		
		
	}
	
return false;
		
  }; 
  
});