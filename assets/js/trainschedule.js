 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD6hANL5cQyrc1vUsqoC4BsBFA_6-phjUU",
    authDomain: "trainsch-9b29e.firebaseapp.com",
    databaseURL: "https://trainsch-9b29e.firebaseio.com",
    storageBucket: "trainsch-9b29e.appspot.com",
    messagingSenderId: "278163231911"
  };
  firebase.initializeApp(config);
  

var database = firebase.database();

// Intial Variables

$("#addTrain").on("click", function() {

	//Get user input
	var trainName = $('#trainName').val().trim();
	var trainDestination = $('#trainDestination').val().trim();
	var firstTrainTime = $('#trainTimeHour').val().trim() + ":" + $('#trainTimeMin').val().trim();
	var trainFrequency = $('#trainFrequency').val().trim();

	console.log(trainName);
	console.log(trainDestination);
	console.log(firstTrainTime);
	console.log(trainFrequency);

	// Creates local "temporary" object for holding employee data
	var newTrain = {
		name:  trainName,
		destination: trainDestination,
		firstTrainAt: firstTrainTime,
		frequency: trainFrequency
	}

	// Uploads employee data to the database
	database.ref().push(newTrain);

	return false;

});

database.ref().on("child_added", function(snapshot, prevChildKey) {
  var newTrain = snapshot.val();
    console.log("Previous Post ID: " + prevChildKey);

   $("#trainList").append("<tr><td>" + newTrain.name+ "</td><td>" + newTrain.destination +"</td><td>" + newTrain.frequency + "</td><td>" + "" +"</td><td>" + "" +"</td></tr>");

 });
 