"use strict";

app.controller("MainCtrl", function($scope, $rootScope, $location, MainFactory){
	
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
			// event.preventDefault();
			// $location.url("/main");
		});
		console.log("glitchy");
	};

	$scope.inputChange = function(place){
		MainFactory.editPlace(place).then(function(response){
		});
	};

	$scope.randomButton = function(checkedPlaces){
		$scope.randomDiv = true;
		console.log("checkedPlaces", checkedPlaces);
		$scope.randomSelectedPlace = checkedPlaces[Math.floor(Math.random() * checkedPlaces.length)];
	};

	$scope.resetButton = function(checks){
		$scope.randomDiv = false;
		checks.forEach(function(check){
			check.isSelected = false;
			MainFactory.editPlace(check).then(function(response){
		});
		});
		console.log("reset place", checks);
		
	};
});