'use strict';

angular.module('myApp.office', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/office', {
    templateUrl: 'views/office/office.html',
    controller: 'OfficeCtrl'
  });
}])

.controller('OfficeCtrl', function($scope, $http, $location, $rootScope) {

console.log("in OfficeCtrl ctrl");
$scope.API_URL_OFFICES=$rootScope.API_URL_OFFICES;
	
$scope.officesList = [];
$http({
        method : "GET",		
        url : $scope.API_URL_OFFICES
    }).then(function mySucces(response) {
		console.log("In success");
		console.log(response);
        $scope.officesList = response.data;
			console.log($scope.officesList);
    }, function myError(response) {
        console.log(response.statusText);
    });
	
$scope.addOffice = function(){
    var office = {
        office: $scope.location,
		city:$scope.city,
        state: $scope.state
    };
    $scope.officesList.push(office);
}; 

$scope.removeOffice = function(index){
    var dataDelete = $scope.officesList[index];
  	var postUrl = $scope.API_URL_OFFICES + '/' + dataDelete._id
	var res = $http.delete(postUrl, dataDelete);
	res.success(function(data, status, headers, config) {
	$location.path('/office');
	$scope.message = data;
	});
	res.error(function(data, status, headers, config) {
	console.log( "failure message: " + JSON.stringify({data: data}));
	});
    $scope.officesList.splice(index, 1);
};  
  
$scope.saveOffice = function(index){
    var dataInsert = $scope.officesList[index];

	var postUrl = "";
	if(dataInsert._id)
	{
		postUrl = $scope.API_URL_OFFICES + '/' + dataInsert._id
		var res = $http.put(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
		$location.path('/office');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
	}
	else
	{
		postUrl = $scope.API_URL_OFFICES;
		var res = $http.post(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
		$location.path('/office');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
	}
  }; 
  
});