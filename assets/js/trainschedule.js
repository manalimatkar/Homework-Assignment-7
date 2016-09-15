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

nextArrival = function(first){

}

    

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
		name: trainName,
		destination: trainDestination,
		firstTrainAt: firstTrainTime,
		frequency: trainFrequency
	}

	// Uploads employee data to the database
	database.ref().push(newTrain);

	// Clears all of the text-boxes
	$("#trainName").val("");
	$("#trainDestination").val("");
	$("#trainTimeHour").val("");
	$("#trainTimeMin").val("");
	$("#trainFrequency").val("");



	return false;

});

database.ref().on("child_added", function(snapshot, prevChildKey) {
  var newTrain = snapshot.val();
    console.log("Previous Post ID: " + prevChildKey);

    var tFrequency = parseInt(newTrain.frequency);
	var firstTime = newTrain.firstTrainAt;

	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
	console.log("firstTimeConverted:" + moment(firstTimeConverted));

	// Current Time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % tFrequency;
	console.log(tRemainder);

	// Minute Until Train
	var tMinutesTillTrain = tFrequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes")
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
	
	
	//console.log("Train frequency: " + tFrequency);
	//console.log("First Train : " + firstTime);


   $("#trainList").append("<tr><td>" + newTrain.name+ "</td><td>" + newTrain.destination +"</td><td>" + newTrain.frequency + "min </td><td>" + moment(nextTrain).format("hh:mm") +"</td><td>" + tMinutesTillTrain + "min" +"</td></tr>");

 });
 