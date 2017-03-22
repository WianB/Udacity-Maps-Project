var map;

// Create a new blank array for all the listing markers.
var markers = [];

var locationModel = function(locations) {

    var self = this;

    //Location Selector
    self.typeSelector = ko.observable();


    //Locations info (to print)
    self.locationInfo = ko.observableArray([]);

    //Drop down info
    self.dropDown = ko.observableArray(["All", "Clubs", "Restaurants", "Bar"]);

    //refresh function
    self.refresh = function() {
        var data = self.locationInfo.slice(0);
        self.locationInfo = [];
        self.locationInfo = data;
    };

    //Monitors the selector
    self.typeSelector.subscribe(function(newValue) {
        console.log(newValue);
        if (newValue === "All") {
            self.locationInfo = [];
            for (var i = 0; i < locations.length; i++) {
                self.locationInfo.push(locations[i].title);

            }
        }
        if (newValue === "Clubs") {
            self.locationInfo = [];
            for (var i = 0; i < locations.length; i++) {
                if (locations[i].type == "Club") {
                    self.locationInfo.push(locations[i].title);
                }
            }
        }
        if (newValue === "Restaurants") {
            self.locationInfo = [];
            for (var i = 0; i < locations.length; i++) {
                if (locations[i].type == "Restaurant") {
                    self.locationInfo.push(locations[i].title);
                }
            }
        }
        if (newValue === "Bar") {
            self.locationInfo = [];
            for (var i = 0; i < locations.length; i++) {
                if (locations[i].type == "Bar") {
                    self.locationInfo.push(locations[i].title);
                }
            }
        }

        console.log(self.locationInfo);
    }, this);
};




function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -33.860518,
            lng: 151.199048
        },
        zoom: 13,
        styles: style,
        mapTypeControl: false
    });

    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    //Call function to create first markers
    createFirstMarkers(bounds, largeInfowindow);

    document.getElementById('show-listings').addEventListener('click', showMapListings);
    document.getElementById('hide-listings').addEventListener('click', hideMapListings);
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        marker.setIcon('img/orange_marker.png');
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            marker.setIcon('img/red_marker.png');
            infowindow.setMarker = null;
        });
    }
}

// This function will loop through the markers array and display them all.
function showMapListings() {
    var bounds = new google.maps.LatLngBounds();
    showListings();

    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}

// This function will loop through the listings and hide them all.
function hideMapListings() {
    hideListings();

    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}



//Hides listings
function hideListings() {
    if (!$('.listings').hasClass('hide')) {
        $('.listings').addClass('hide');
    }
}


//Clears listings
function showListings() {
    if ($('.listings').hasClass('hide')) {
        $('.listings').removeClass('hide');
    }
}


function createFirstMarkers(bounds, largeInfowindow) {
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i,
            icon: 'img/red_marker.png'
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);

        });
        bounds.extend(markers[i].position);
    }

    //console.log(locations.length);
    ko.applyBindings(new locationModel(locations));
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);

}

$('.burger_menu').click(function() {
    if ($('.options-box').css('left') == "0px") {
        $('.options-box').removeClass("show_options-box");
    } else {
        $('.options-box').addClass("show_options-box");
    }
    console.log("It has been clicked");
});


function updateMapMarkers(value) {
/*


To be implemented

*/
}
