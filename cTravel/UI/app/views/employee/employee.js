'use strict';

angular.module('myApp.employee', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/employee', {
    templateUrl: 'views/employee/employee.html',
    controller: 'EmployeeCtrl'
  });
}])

.controller('EmployeeCtrl', function($scope, $http, $location, $rootScope) {
console.log("in EmployeeCtrl ctrl");


	$scope.API_URL_EMPLOYEES=$rootScope.API_URL_EMPLOYEES;	

	
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
	
	console.log("After http request");
	console.log($scope.employeesList);
	
	
	$scope.addEmployee = function(){
    var employee = {
        name: $scope.name,
		email:$scope.email,
        password: $scope.password
    };

    $scope.employeesList.push(employee);
  }; 

  $scope.removeEmployee = function(index){
      var dataDelete = $scope.employeesList[index];
  		var postUrl = $scope.API_URL_EMPLOYEES + '/' + dataDelete._id
		console.log(postUrl);
		var res = $http.delete(postUrl, dataDelete);
		res.success(function(data, status, headers, config) {
		$location.path('/employee');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
		
		
    $scope.employeesList.splice(index, 1);
  };  
  
  	
	$scope.saveEmployee = function(index){
	console.log(index);
    var dataInsert = $scope.employeesList[index];

	var postUrl = "";
	if(dataInsert._id)
	{
	
		postUrl = $scope.API_URL_EMPLOYEES + '/' + dataInsert._id
		var res = $http.put(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
		$location.path('/employee');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
		
	}
	else
	{
		postUrl = $scope.API_URL_EMPLOYEES;
		var res = $http.post(postUrl, dataInsert);
		res.success(function(data, status, headers, config) {
		$location.path('/employee');
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});
		
		
	}
	

		
  }; 
  
});