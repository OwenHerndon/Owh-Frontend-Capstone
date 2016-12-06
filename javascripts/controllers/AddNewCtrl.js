"use strict";

app.controller("AddNewCtrl", function($scope, $rootScope, $location, NewFactory){
	
	$scope.newPlace = {};

	$scope.addNewPlace=function(){
		$scope.newPlace.isSelected = false;
		$scope.newPlace.uid = $rootScope.user.uid;
		NewFactory.postNewPlace($scope.newPlace).then(function(placeId){
			$location.url("/main");
			$scope.newPlace = {};
			});
	};
});