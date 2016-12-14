"use strict";

app.controller("NavCtrl", function($scope){
	$scope.navItems = [
	{	name:"Logout",
		url: "#/logout"
	},
	{	name:"Search",
		url: "#/search"
	}
	// {	name:"Main",
	// 	url: "#/main"
	// },
	// {	name:"Custom",
	// 	url: "#/new-place"
	// }
	];

	$scope.navItemsRight = [
	{	name:"Main",
		url: "#/main"
	},
	{	name:"Custom",
		url: "#/new-place"
	}
	];
});