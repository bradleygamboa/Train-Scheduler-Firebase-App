// Steps to complete:
/*
1. Create Firebase link
2. Create button for adding new employees - then update the html + update the database
3. Create a way to retrieve employees from the employee database.
4. Create a way to calculate the months worked. Using difference between start and current time. Then use moment.js formatting to set difference in months.
5. Calculate Total billed

*/
// 1. Link to Firebase
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3a3HM_r2Bcn1InTib0hv7ZUv9TBfu870",
    authDomain: "employeedata-1bb3a.firebaseapp.com",
    databaseURL: "https://employeedata-1bb3a.firebaseio.com",
    storageBucket: ""
  };
  firebase.initializeApp(config);

var empStart, empName, empStart, empRate;

$('#datepicker').datepicker();

$('#datepicker').on('change', function(event){
    empStart = event.currentTarget.value;
});

// 2. Button for adding Employees
$("#addEmployeeBtn").on("click", function(){

	// Grabs user input
	empName = $("#employeeNameInput").val().trim();
	empRole = $("#roleInput").val().trim();
	empRate = $("#rateInput").val().trim();

	// Creates local "temporary" object for holding employee data
	var newEmp = {
		name:  empName,
		role: empRole,
		start: empStart,
		rate: empRate
	};

	// Uploads employee data to the database
	firebase.database().ref().push(newEmp);

	// Logs everything to console
	console.log(newEmp.name);
	console.log(newEmp.role);
	console.log(newEmp.start);
	console.log(newEmp.rate);

	// Clears all of the text-boxes
	$("#employeeNameInput").val("");
	$("#roleInput").val("");
	$("#startInput").val("");
	$("#rateInput").val("");

});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
firebase.database().ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	empName = childSnapshot.val().name;
	empRole = childSnapshot.val().role;
	empStart = childSnapshot.val().start;
	empRate = childSnapshot.val().rate;

	// Employee Info
	console.log(empName);
	console.log(empRole);
	console.log(empStart);
	console.log(empRate);

	// Prettify the employee start
  	// Calculate the months worked using hardconre math
	// To calculate the months worked
  var todaysDate = moment();
	var empMonths = todaysDate.diff(empStart, "months");
	console.log('Months: ' + empMonths);

	// Calculate the total billed rate
	var empBilled = empMonths * empRate;
	console.log(empBilled);

	// Add each train's data into the table
	$("#employeeTable > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" + empStart + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");

});


// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
