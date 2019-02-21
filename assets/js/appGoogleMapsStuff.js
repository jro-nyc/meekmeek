
 $(".button-collapse").sideNav();

 $('.slider').slider({
 	indicators: false,
 	height: 550
 	});

$(function () {
  $(document).scroll(function () {
    var $nav = $(".nav-switch");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();
 
//});
//--- Google Places Search Box ---
// This variable will be pre-programmed with our authentication key
// (the one we received when we registered)

var searchPlacesArray = [];
var searchPlacesImages = [];
var authKey = "AIzaSyB-9YSa9Ou2sYYULk422kXQz5lWrz0cqUk";

// These variables will hold the results we get from the user's inputs via HTML

var placesimg;
var map;

	google.maps.event.addDomListener(window, 'load', function () {
		var places = new google.maps.places.Autocomplete(document.getElementById('search'));
		google.maps.event.addListener(places, 'place_changed', function () {
			var place = places.getPlace();
			console.log("This is value of place:..." + place);
			var address = place.formatted_address;
			var placeid = place.place_id;
			var mesg = "Address:.." + address;
			mesg += "\nPlaceId:... " + placeid;
//			alert(mesg);
			console.log("This is placeid:... " + placeid);
			createPhotoMarker(place);
			initialize(place);
			getWeather(address);

		});
	});
	
	function createPhotoMarker(place) {
	  var photos = place.photos;
	  if (!photos) {
		return;
	  }

	  var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location,
		title: place.name,
		icon: photos[0].getUrl({'maxWidth': 934, 'maxHeight': 550})
	  });
		console.log("This is the value of title:... " + place.name);
		console.log("This is the value of icon:... " + photos[0].getUrl({'maxWidth': 934, 'maxHeight': 550}));

		// Creating and storing an image tag
		var cityImage = $("<img>");

		// Adding attributes to the image tag 

		$('#cityimg').attr('src', photos[0].getUrl({'maxWidth': 934, 'maxHeight': 550}));

	}

//-- Retrieve Google Places Detail such as restaurants or lodging, etc.

var map;

	function initialize(place) {
	  // Create a map centered in SMU Dallas, TX.
	  map = new google.maps.Map(document.getElementById('search'), {
		center: {lat: 32.8412, lng: 96.7845},
		zoom: 15
	  });

	  // Search for Food and Drink.
	  queryText = "Food and drink";
	  var request = {
		placeId: place.place_id,
		location: map.getCenter(),
		radius: '500',
		query: queryText + place.name,
		address: place.formatted_address
	  };

	  var service = new google.maps.places.PlacesService(map);

		service.textSearch(request, callback, place);

	}

// Callback processes results and checks that the PlacesServiceStatus is OK, and adds a marker
// using the place ID and location from the PlacesService.
	function callback(results, status, place) {
	  if (status == google.maps.places.PlacesServiceStatus.OK) {
		var marker = new google.maps.Marker({
		  map: map,
		  place: {
			placeId: results[0].place_id,
			types: results[0].types,
			icon: results[0].photos[0].getUrl({'maxWidth': 183, 'maxHeight': 183}),
			title: results[0].name,
			address: results[0].address,
			rating: results[0].rating,
			phone: results[0].phone_number,
			website: results[0].website,
			review: results[0].reviews
			
		  }
		});
		var places = place;
		var photos = places.photos;
		$("#fooddrink").empty();
		for (i=0; i < results.length; i++) {		
			var placesAddress = results[i].formatted_address;

			console.log(results);
			console.log("********************************");
			console.log("This is the value of placeid:... " + results[i].place_id);
			console.log("This is the value of types:... " + results[i].types);
			console.log("This is the value of icon:... " + results[i].photos[0].getUrl({'maxWidth': 183, 'maxHeight': 183}));
			console.log("This is the value of title:... " + results[i].name);
			console.log("This is the value of address:... " + results[i].formatted_address);
			console.log("This is the value of Viewport Longitude:... " + results[i].geometry.viewport.b.b);
			console.log("This is the value of Viewport Latitude:... " + results[i].geometry.viewport.f.b);			
			console.log("This is the value of rating:... " + results[i].rating);
			console.log("This is the value of phone:... " + results[i].phone_number);
			console.log("This is the value of website:... " + results[i].website);
			console.log("This is the value of review:... " + results[i].reviews);
			console.log("********************************");

			var n = $("<p>").text(results[i].name);
			var r = $("<p>").text("Rating: " + results[i].rating);
			var x = $("<p>").text("Review: " + results[i].reviews);
//			var m = $("<p>").text("Placeid: " + results[i].place_id);
			// Creating and storing an image tag
			var topicImageDiv = $("<div>");
			topicImageDiv.attr("class", "col m3");
			var topicImage = $("<img>");
			topicImage.attr("class", "responsive-img places-img");
			// Setting the src attribute of the image to a property pulled from searchPlacesArray
			topicImage.attr("src", results[i].photos[0].getUrl({'maxWidth': 183, 'maxHeight': 183})); 
			topicImage.attr('style', "width: 183px; height: 183px;");
			// Adding attributes to the image tag 
			
			if (results[i].rating > "4.2") {
				topicImageDiv.append(topicImage);
				topicImageDiv.append(n);
				topicImageDiv.append(r);
				topicImageDiv.append(x);
//				topicImageDiv.append(m);

				// appending the topicImage to the HTML page in the "#fooddrink" section
				$("#fooddrink").append(topicImageDiv);
				console.log("topicImageDiv");
			}

		}
	  }
	}

//-- Retrieve Google Places Detail such as restaurants or lodging, etc.

//-- Retrieve weather information from openweathermap.com 

	function getWeather (address) {
		var APIKey = "a4f825c4e99f2b815d00de1187f33b12";
		// Here we are building the query parameter from the Google Search box
		var query_param = address;
		
		// Here we are building the URL we need to query the database
		var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
		  "q=" + query_param + "&units=imperial&appid=" + APIKey;

		  // Here we run our AJAX call to the OpenWeatherMap API
		$.ajax({
			url: queryURL,
			method: "GET"
		  })
		  // We store all of the retrieved data inside of an object called "response"
		  .done(function(response) {

			// Log the queryURL
			console.log(queryURL);

			// Log the resulting object
			console.log(response);
	 
			// Transfer content to HTML
			var weatherToday = $("<h4>");
			weatherToday.text(response.name + " " + response.weather[0].main + " Temp: " + 
				response.main.temp +" with " + 
				response.weather[0].description) 
			$("#weatherid").html(weatherToday);
			console.log("This is the value of weatherToday:... " + weatherToday);

		  });

    }

//--- Google Places Search Box ---