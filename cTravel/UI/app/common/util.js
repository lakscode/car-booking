var myApp = angular.module('myApp', []);

//service style, probably the simplest one
myApp.service('utilityService', function() {
    this.locsList=[];
    this.getLocations = function() {
	$scope.API_URL="http://localhost:3000/locations";
	$http({
        method : "GET",		
        url : $scope.API_URL
    }).then(function mySucces(response) {
        locsList = response.data;
    }, function myError(response) {
        console.log(response.statusText);
    });
        return this.locsList;
    };
});
