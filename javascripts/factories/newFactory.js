"use strict";

app.factory("NewFactory", function($q, $http, FIREBASE_CONFIG){

var postNewPlace = function(newPlace){
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/places.json`, JSON.stringify({
				name: newPlace.name,
				isSelected: newPlace.isSelected,
				uid: newPlace.uid
			})
			)
			.success(function(postResponse){
				resolve(postResponse);
			})
			.error(function(postError){
				reject(postError);
			});
		});
	};

return{postNewPlace:postNewPlace};
});