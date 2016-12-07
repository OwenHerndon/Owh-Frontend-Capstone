"use strict";

app.controller("SearchCtrl", function($scope){
    
    function initAutocomplete() {
        $scope.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        //geo location
        var infoWindow = new google.maps.InfoWindow({map: $scope.map});
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            $scope.map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, $scope.map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, $scope.map.getCenter());
        }

        
        console.log("searchBox", searchBox);

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        $scope.map.addListener('bounds_changed', function() {
          searchBox.setBounds($scope.map.getBounds());
        });

        $scope.markers = [];

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          $scope.places = searchBox.getPlaces();
          console.log("places", $scope.places); //go information to dive into
          if ($scope.places.length === 0) {
            return;
          }

          // Clear out the old markers.
          $scope.markers.forEach(function(marker) {
            marker.setMap(null);
          });
          $scope.markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          $scope.places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
       
            // Create a marker for each place.
            $scope.markers.push(new google.maps.Marker({
              map: $scope.map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));
            console.log("markers", $scope.markers);

            

         //    marker.addListener('click', function() {
         //  		infoWindow.open($scope.map, $scope.markers);
         //  		console.log("infoWindow", infoWindow);
        	// });
            //taylors button
            // // for (var i = 0; i < $scope.markers.length; i++) {
            //    var marker = $scope.markers[i];
            //     var contentString = '<button class="btn btn-success" ng-click=buttonClick()>Hey</button>';
            // //    // var compiled = $compile(contentString)($scope);
            //     google.maps.event.addListener($scope.marker, 'click', function() {
            //         infoWindow.setContent(contentString);
            // 	    infoWindow.open($scope.map, this);

            //     });
           	// // }
           	//***********************

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          $scope.map.fitBounds(bounds);
          console.log("map scope", $scope.map);
        });
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

      initAutocomplete();
});