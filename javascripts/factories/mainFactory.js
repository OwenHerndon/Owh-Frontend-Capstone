"use strict";

app.factory("MainFactory", function($q, $http, FIREBASE_CONFIG){

	var getPlaces = function(userId){
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/places.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(response){
				let places = [];
				Object.keys(response).forEach(function(key){
					response[key].id = key;
					places.push(response[key]);
				});
				resolve(places);
			})
			.error(function(errorResponse){
				reject(errorResponse);
			});
		});
	};

	var deletePlace = function(placeID){
		return $q((resolve, reject) =>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/places/${placeID}.json`)
			.success(function(deleteResponse){
				resolve(deleteResponse);
			})
			.error(function(deleteError){
				reject(deleteError);
			});
		});
	};

	var editPlace = function(editPlace){
		return $q((resolve, reject) => {
			$http.put(`${FIREBASE_CONFIG.databaseURL}/places/${editPlace.id}.json`, JSON.stringify({
				name: editPlace.name,
				isSelected: editPlace.isSelected,
				uid: editPlace.uid
			})
			)
			.success(function(editResponse){
				resolve(editResponse);
			})
			.error(function(editError){
				reject(editError);
			});
		});
	};

return {getPlaces:getPlaces, deletePlace:deletePlace, editPlace:editPlace};
});