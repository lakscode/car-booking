'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp.report', ['ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/report', {
    templateUrl: 'views/report/report.html',
    controller: 'ReportCtrl'
  });
}])
.controller('ReportCtrl', function($scope, $http, $rootScope) {
$scope.selRep = '';
	$scope.API_URL = $rootScope.API_URL;
  	$scope.API_URL_OFFICES=$rootScope.API_URL_OFFICES;
	$scope.API_URL_EMPLOYEES=$rootScope.API_URL_EMPLOYEES;	
	$scope.API_URL_BOOKINGS=$rootScope.API_URL_BOOKINGS;	
	$scope.API_URL_LOCATIONS=$rootScope.API_URL_LOCATIONS;
	$scope.API_URL_CARS=$rootScope.API_URL_CARS;
	
	
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




 $scope.selectfilter = function() {
 //alert($scope.selRep);

$scope.arrayList = [];
 if($scope.selRep == "booking")
 {
 $scope.loadData($scope.API_URL_BOOKINGS);
  	$scope.gridOptions = {
        columnDefs: [
          { name:'Name', field: 'name'},
          { name:'source', field: 'source' },
          { name:'destination', field: 'destination'},
		  { name:'car', field: 'carnumber'},
		  { name:'time', field: 'time'}
        ]
      };
	  
 }
 
	if($scope.selRep == "location")
	{
		$scope.loadData($scope.API_URL_LOCATIONS);
		$scope.gridOptions = {
			columnDefs: [
			  { name:'Location', field: 'location'},
			  { name:'city', field: 'city' },
			  { name:'state', field: 'state'}
			]
		};
	  
	}
	
	if($scope.selRep == "car")
	{
		$scope.loadData($scope.API_URL_CARS);
		$scope.gridOptions = {
			columnDefs: [
			  { name:'Name', field: 'name',             
				cellTemplate: '{{grid.myAppScope.getEmployeeNameById(row.entity.name)}}'
			  },
			  { name:'Phone', field: 'phone' },
			  { name:'carnumber', field: 'carnumber'},
			  { name:'Location', field: 'location'}
			]
		};
	  
	}
	
     
	 
	 $scope.gridApi.grid.refresh();
  };
  
  
  
 $scope.filter = function() {
    $scope.gridApi.grid.refresh();
  };
  
  
   $scope.filterClear = function() {

$scope.filterValueName ='';
$scope.filterValueSource = '';
$scope.filterValueDest = '';

    $scope.gridApi.grid.refresh();
  };
  
  
 	
	$scope.loadData = function(API_URL){

	$http({
        method : "GET",		
        url : API_URL
    }).then(function mySucces(response) {
		console.log("In success");
		console.log(response);
        $scope.arrayList = response.data;
		console.log("Selrep " + $scope.selRep);
		 if($scope.selRep === "booking")
		{
		console.log("inside booking");
			$scope.arrayList.forEach( function( row ) {
		//	row['name'] = $scope.getEmployeeNameById(row['name']);
			row['source'] = $scope.getSourceLocById(row['source']);
			row['destination'] = $scope.getDestinationLocById(row['destination']);
			row['carnumber'] = $scope.getCarNumberById(row['carnumber']);
			});
		}
		
		 if($scope.selRep === "car")
		{
			$scope.arrayList.forEach( function( row ) {
			row['location'] = $scope.getSourceLocById(row['location']);

			});
		}
		
		
		$scope.gridOptions.data = response.data;
		console.log($scope.arrayList);
    }, function myError(response) {
        console.log(response.statusText);
    });
	};

  
 /******************** Angular UI Grid settings ************************/
  
  $scope.gridOptions = {
        enableSorting: true,
		enableFiltering: false,
		 onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
      $scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 );
    }
      };

	  	$scope.API_URL_BOOKINGS=$rootScope.API_URL_BOOKINGS;
		
		if($scope.selRep != "")
		$scope.loadData($scope.API_URL_BOOKINGS);
/******************** Angular UI Grid settings ************************/	  

	
	
	  $scope.singleFilter = function( renderableRows ){
var matcher;
	     if($scope.filterValueName == null)
	  $scope.filterValueName = '';
	  
	  if($scope.filterValueSource == null)
	  $scope.filterValueSource = '';
	  
	   if($scope.filterValueDest == null)
	  $scope.filterValueDest = '';
	  

  if($scope.selRep === "booking")
  {
    matcher = new RegExp($scope.getEmployeeNameById($scope.filterValueName));
    renderableRows.forEach( function( row ) {

      var match = false;
      ['name'].forEach(function( field ){
	  //	console.log("within loop" + row.entity[field]);
        if (row.entity[field].match(matcher) ){
          match = true;
        }
      });
      if ( !match ){
        row.visible = false;
      }
    });
	

	matcher = new RegExp($scope.getSourceLocById($scope.filterValueSource));
    renderableRows.forEach( function( row ) {
      var match = false;
      ['source'].forEach(function( field ){
        if (row.entity[field].match(matcher) ){
          match = true;
        }
      });
      if ( !match ){
        row.visible = false;
      }
    });

	matcher = new RegExp($scope.getDestinationLocById($scope.filterValueDest));

    renderableRows.forEach( function( row ) {
      var match = false;
      ['destination'].forEach(function( field ){
        if (row.entity[field].match(matcher) ){
          match = true;
        }
      });
      if ( !match ){
        row.visible = false;
      }
    });
	
	}
    return renderableRows;
  };
  
  
 
 
 
});
