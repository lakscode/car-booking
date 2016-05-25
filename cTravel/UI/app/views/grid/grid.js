'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp.grid', ['ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/grid', {
    templateUrl: 'views/grid/grid.html',
    controller: 'GridCtrl'
  });
}])
.controller('GridCtrl', function($scope, $http, $rootScope) {

 $scope.filter = function() {
 alert("filter function");
    $scope.gridApi.grid.refresh();
  };
  
 /******************** Angular UI Grid settings ************************/
  
  $scope.gridOptions = {
        enableSorting: true,
		enableFiltering: false,
		 onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
      $scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 );
    },
        columnDefs: [
          { name:'Name', field: 'name'},
          { name:'source', field: 'source' },
          { name:'destination', field: 'destination'},
		  { name:'car', field: 'carnumber'},
		  { name:'time', field: 'time'}
        ]
      };

	  	$scope.API_URL_BOOKINGS=$rootScope.API_URL_BOOKINGS;
		
/******************** Angular UI Grid settings ************************/	  
	  
//$scope.API_URL="http://localhost:3000/bookings";
	
	$scope.employeesList = [];
	console.log("Before http request");
	$http({
        method : "GET",		
        url : $scope.API_URL_BOOKINGS
    }).then(function mySucces(response) {
		console.log("In success");
		console.log(response);
        $scope.employeesList = response.data;
		$scope.gridOptions.data = response.data;
		console.log($scope.employeesList);
    }, function myError(response) {
        console.log(response.statusText);
    });
	
	console.log("After http request");
	console.log($scope.employeesList);
	
	
	
	  $scope.singleFilter = function( renderableRows ){
    var matcher = new RegExp($scope.filterValue);
    renderableRows.forEach( function( row ) {
      var match = false;
      ['name', 'source', 'destination'].forEach(function( field ){
        if (row.entity[field].match(matcher) ){
          match = true;
        }
      });
      if ( !match ){
        row.visible = false;
      }
    });
    return renderableRows;
  };
  
  
  
  $scope.searchFilter = function (employee) {
    var keyword = new RegExp($scope.nameFilter, 'i');
    return !$scope.nameFilter || keyword.test(employee.name) ;
};
  
  
 
 
 
});
