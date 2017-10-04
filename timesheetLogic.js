
// 1. Initialize Firebase
 var config = {
    apiKey: "AIzaSyB8hUuxWA8axM7wIS8S2xBaATiq8rgQQWw",
    authDomain: "traintime-d05af.firebaseapp.com",
    databaseURL: "https://traintime-d05af.firebaseio.com",
    storageBucket: "",
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);

  //display the time in military time 
  var trainStartFormat = moment.unix(trainStart).format("HH:mm a");

  var diffTime = moment().diff(moment.unix(trainStart, "X"), "minutes");
  console.log("Difference in time: " + diffTime);

  var timeRemainder = diffTime % trainFrequency;
  console.log("Remainder: " + timeRemainder)

  // Calculate how many minutes are away
  var minAway = trainFrequency - timeRemainder;
  console.log("Mins til train: " + minAway);



  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" +
  trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainStartFormat + "</td><td>" + minAway + "</td></tr>");
});

