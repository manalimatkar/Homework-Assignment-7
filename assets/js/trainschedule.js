// Initialize Firebase

  var config = {
    apiKey: "AIzaSyDe13RnvAnEgoeGGtvbtvMjmCmt86DZmvE",
    authDomain: "codersbay-c737e.firebaseapp.com",
    databaseURL: "https://codersbay-c737e.firebaseio.com",
    storageBucket: "codersbay-c737e.appspot.com",
  };
  firebase.initializeApp(config);


// Create a variable to reference the database

var database = firebase.database();

// Initial Values
var initialBid = 0;
var initialBidder = "No one :-("

var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// 
// At the initial load, get a snapshot of the current data.
database.ref().on("value", function(snapshot) {

	// If Firebase has a highPrice and highBidder stored (first case)
	if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

		// Set the initial variables for highBidder equal to the stored values.
         
         highBidder = snapshot.val().highBidder;
         highPrice =  snapshot.val().highPrice;

		// Change the HTML to reflect the initial value
         
        $("#highestBidder").html(highBidder);
        $("#highestPrice").html(highPrice);


		// Print the initial data to the console.
		console.log("snapshot.val().highBidder"+ snapshot.val().highBidder);
		console.log("snapshot.val().highPrice"+ snapshot.val().highPrice);
	}

	// Keep the initial variables for highBidder equal to the initial values
	else{

		// Change the HTML to reflect the initial value


		highPrice = initialBid;
		highBidder = initialBidder;

		// Print the initial data to the console.
		$("#highestBidder").html(highBidder);
        $("#highestPrice").html(highPrice);




	}



// If any errors are experienced, log them to console. 
}, function (errorObject) {

  	console.log("The read failed: " + errorObject.code);

});

// --------------------------------------------------------------

// Whenever a user clicks the click button
$("#submitBid").on("click", function() {

	// Get the input values

	var bidderName = $("#bidderName").val().trim();
	var bidderPrice = parseInt($("#bidderPrice").val().trim());

	// Log the Bidder and Price (Even if not the highest)



	if(bidderPrice > highPrice) {

		// Alert 
		alert("You are now the highest bidder.");


        //clear input fields

        $("#bidderPrice").val("");
        $("#bidderName").val("");


		// Save the new price in Firebase
		database.ref().set({
			highBidder: bidderName,
			highPrice: bidderPrice
		});


		// Log the new High Price

		console.log(highPrice);

		// Store the new high price and bidder name as a local variable (could have also used the firebase variable)

		highPrice = bidderPrice;
		highBidder = bidderName;


		// Change the HTML to reflect the new high price and bidder

		$("#highestBidder").html(bidderName);
        $("#highestPrice").html(bidderPrice);


	}

	else{

		// Alert
		alert("Sorry that bid is too low. Try again.");	
	}

	// Return False to allow "enter"
	return false;
});


