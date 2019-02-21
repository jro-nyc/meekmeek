// Initialize Firebase

	var config = {
		apiKey: "AIzaSyAWiUMS6nCqa_8Tw1dyhRWkXEHoLlzR4MU",
		authDomain: "smallworldtrips.firebaseapp.com",
		databaseURL: "https://smallworldtrips.firebaseio.com",
		projectId: "smallworldtrips",
		storageBucket: "smallworldtrips.appspot.com",
		messagingSenderId: "748661718964"
	};

	firebase.initializeApp(config);


// Create a variable to reference the database
	var database = firebase.database();
	var dbkey = database.key;


// --------------------------------------------------------------

	//Variables for the initial case, will hold user data

	var destination = "";
	var startdate = "";
	var enddate = "";

	var tripIDs = [];		//Holds the keys for each trip to be used in removal and edits
	var globalIndex = 0;	//Used to keep track of which element for removal and editing

	//Displays the current time
	var currentTime = moment().format('h:mm A');
	$('#currentTime').html("The time is now: " + currentTime);

	//When you add a train to the database
	$('#addTrip').click(function() {
		console.log("Entering my-form block:...")
		destination = $('#destinationinput').val().trim(); 
		console.log("This is the value of destination:..." + destination);
		startdate = $('#startdateinput').val().trim();
		console.log("This is the value of startdate:..." + startdate);
		enddate = $('#enddateinput').val().trim();
		console.log("This is the value of enddate:..." + enddate);

		// Save new value to Firebase
		
		database.ref().push({
			destination: destination,
			startdate: startdate,
			enddate: enddate
		});

		//Reload needed for the removal to work on last element
		location.reload();
		return false;
	});

	//Will display changes when there are children added to the database
	database.ref().on("child_added", function(snapshot) {

		var deletme = "ridme-" + globalIndex;

		$('#display').append("<tr><td id='destinationDisplay'>" + snapshot.val().destination +
			"</td><td id='startdateDisplay'>" + "Start: " + moment(snapshot.val().startdate).format("YYYY-MM-DD") + 
			"</td><td id='enddateDisplay'>" + "End: " + moment(snapshot.val().enddate).format("YYYY-MM-DD") +
			"</td><td id='editbuttons'><button class='removeme' id=" + deletme + " data-indexNum=" + globalIndex + " title='Remove Trip?'><div class='glyphicon glyphicon-trash'></div></button> " +
			"<button class='editme' data-indexNum=" + globalIndex + " title='Edit Train?'><div class='glyphicon glyphicon-pencil'></div></button></td>");

		globalIndex++;

	}, function (errorObject) {

	  	console.log("The read failed: " + errorObject.code);

	});

	//Gets the trip IDs in an Array
	database.ref().once('value', function(dataSnapshot){ 
    	var indexofTrips = 0;

        dataSnapshot.forEach(
            function(childSnapshot) {
                tripIDs[indexofTrips++] = childSnapshot.key;
            }
        );
    });

	
	//When you click on the edit button, it asks you for each item again and sets it to the database
//	$(document.body).on('click', '.editme', function(){
		
//		var x = $(this).attr("data-indexNum");
//		var num = x;
		
//		console.log("This is the value of num in .editme:..." + num);

//		destination = prompt("What do you want the destination to be?");
//		startdate = prompt("What Date did you want to start your trip? (MMM/DD/YY)");
//		enddate = prompt("What Date do you want to end your trip? (MMM/DD/YY)");


//		database.ref().child(trainIDs[num]).set({
//			destination: destination,
//			startdate: startdate,
//			enddate: enddate
//		});

		//Must reload to show the database changes on the page
//		location.reload();

//});
	
	//When you click on the remove buttons, it gets the row it's on and deletes it from the database
	$(document.body).on('click', '.removeme', function(){

		var y = $(this).attr("data-indexNum");
		var num = y;
				
		console.log("This is the value of num in .removeme:..." + num);		
		database.ref().child(tripIDs[num]).remove();

		//Must reload to show the database changes on the page
		location.reload();
//	}
});
	
//});	
