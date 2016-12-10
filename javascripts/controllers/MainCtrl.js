"use strict";

app.controller("MainCtrl", function($scope, $rootScope, MainFactory){
	
	$scope.places = [];
	
	let getPlaces = function(){
	MainFactory.getPlaces($rootScope.user.uid).then(function(fbPlaces){
		$scope.places = fbPlaces;
	});
	};

	getPlaces();

	$scope.deletePlace = function(placeId){
		MainFactory.deletePlace(placeId).then(function(response){
			getPlaces();
		});
	};

	$scope.inputChange = function(place){
		MainFactory.editPlace(place).then(function(response){
		});
	};

	$scope.randomButton = function(checkedPlaces){
		console.log("checkedPlaces", checkedPlaces);
		$scope.randomSelectedPlace = checkedPlaces[Math.floor(Math.random() * checkedPlaces.length)];
	};

	$scope.resetButton = function(checks){
		checks.forEach(function(check){
			check.isSelected = false;
			MainFactory.editPlace(check).then(function(response){
		});
		});
		console.log("reset place", checks);
		
	};
});