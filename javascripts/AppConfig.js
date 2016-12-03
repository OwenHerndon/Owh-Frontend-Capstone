"use strict";

let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
	if(AuthFactory.isAuthenticated()){
		resolve();
	}else{
		reject();
	}
});

app.run(function($rootScope, $location, FIREBASE_CONFIG, AuthFactory){
	firebase.initializeApp(FIREBASE_CONFIG);

	$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){

		let logged = AuthFactory.isAuthenticated();
		let appTo;

		if(currRoute.originalPath){
			appTo = currRoute.originalPath.indexOf('/auth') !==-1;
		}

		if(!appTo && !logged){
			event.preventDefault();
			$location.path('/auth');
		}

	});

});

app.config(function($routeProvider){
	$routeProvider
		.when('/auth',{
			templateUrl:'partials/auth.html',
			controller:'AuthCtrl'
		})
		.when('/search', {
      templateUrl: 'partials/search.html', //see partials folder
      controller: 'UserPinsCtrl', // see new controller file
      resolve: {isAuth}
    })
    .when('/boards', {
      templateUrl: 'partials/boards.html',
      controller: 'UserPinsCtrl',
      resolve: {isAuth}
    })
    .when('/new-pin', {
      templateUrl: 'partials/new-pin.html',
      controller: 'UserPinsCtrl',
      resolve: {isAuth}
    })
		.when('/logout',{
			templateUrl:'partials/auth.html',
			controller:'AuthCtrl',
			resolve: {isAuth}
		})
		.otherwise('/auth');
});