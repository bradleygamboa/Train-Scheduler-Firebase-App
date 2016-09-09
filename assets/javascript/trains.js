var currentDay = moment().format("YYYY-MM-DD");
console.log(currentDay)

var trainData = new Firebase("https://class-assignment-week-7.firebaseio.com/");

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;
var arrival = 0;
var wait = 0;

$("#submit").click(function() {

	trainName = $("#nameInput").val().trim();
	destination = $("#destinationInput").val().trim();
	firstTrain = $("#timeInput").val().trim();
	frequency = $("#frequencyInput").val().trim();

	console.log("Name: " + trainName)
	console.log("Destination: " + destination)
	console.log("First Train: " + firstTrain)
	console.log("Frequency: " + frequency)

	trainData.push ({
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	});

	$("input").val(null)
});



trainData.on('child_added', function(childSnapshot, prevChildKey) {

	var holyshitworkplease = currentDay + " " + childSnapshot.val().firstTrain
	console.log(holyshitworkplease)
	console.log( moment(holyshitworkplease).format("X") )

	var startTime = moment(holyshitworkplease).format("X")
	console.log("x-x-x-x-x")
	console.log(startTime)
	console.log(currentDay)
	console.log(childSnapshot.val().firstTrain)

	// var startTime = moment(currentDay + "14:00").format("X")

	var currentTime = moment().format("X")

	console.log(moment.unix(currentTime).format("hh:mm"))

	var timeDifference = currentTime - startTime

	var minutes = Math.floor(timeDifference/60)

	console.log(childSnapshot.val().frequency)

	var next = (minutes%childSnapshot.val().frequency)
	console.log(next)
	console.log(childSnapshot.val().frequency - next)

	var nextTime = childSnapshot.val().frequency - next;


	// =================================================================

	var trainDiv = $("<tr>");

	var nameTD = $("<td>");
	nameTD.append(childSnapshot.val().trainName);

	var destinationTD = $("<td>");
	destinationTD.append(childSnapshot.val().destination);

	var frequencyTD = $("<td>");
	frequencyTD.append(childSnapshot.val().frequency);


	var something = currentTime +  (childSnapshot.val().frequency - next)*60

	console.log("xxxxx")
	console.log(currentTime)
	console.log((childSnapshot.val().frequency - next)*60)
	console.log("xxxxx")

	var nextTrainTD = $("<td>");
	nextTrainTD.append( moment().add(nextTime, 'minutes').format("hh:mm") );


	// var nextTrainTD = $("<td>");
	// nextTrainTD.append( currentTime +  (childSnapshot.val().frequency - next)*60 );

	var minutesAwayTD = $("<td>");
	minutesAwayTD.append( childSnapshot.val().frequency - next )

	// var nameTD = ("<td>")
	// nameTD.append(childSnapshot.val().name)

	// var nameTD = ("<td>")
	// nameTD.append(childSnapshot.val().name)

	trainDiv.append(nameTD);
	trainDiv.append(destinationTD);
	trainDiv.append(frequencyTD);
	trainDiv.append(nextTrainTD);
	trainDiv.append(minutesAwayTD);


	$("#contentTable").append(trainDiv)



}, function(errorObject){

		console.log("Errors handled: " + errorObject.code);

});

// var time = "02:12"
// var convertedTime = moment(new Date(time));

// console.log(moment(convertedTime, "hmm").format("X"))

// ==========================================================

// console.log( moment("2016-3-13 02:12").format("X") )
// console.log( moment().format("X") )

// var time1 = moment("2016-3-13 02:12").format("X")
// var time2 = moment().format("X")

// var time3 = time2 - time1
// console.log(time3)
// console.log(Math.floor(time3/60))
// var minutes = Math.floor(time3/60)
// console.log(minutes)

// var next = (minutes%23)
// console.log(next)
// console.log(23 - next)

// unix time of the current time minus thegfdfdfrdme of the start time. Then take the modulo/remainder of that number and the frequency of the train ex: 1234%23 and subrtact the modulo from the frequency of the train to get the minutes remaining ex: 23-15 = 8 min remaining?
// ===========================================================

// 1457928000 is 12AM today
