// Initialize firebase
var firebaseConfig = {
    //
    //
    //Add API key!
    apiKey: "AIzaSyD_-IWOWvOWHSuCkko7G0crYLy8YT2xQ8M",
    authDomain: "trainschedule-478a8.firebaseapp.com",
    databaseURL: "https://trainschedule-478a8.firebaseio.com",
    projectId: "trainschedule-478a8",
    storageBucket: "trainschedule-478a8.appspot.com",
    messagingSenderId: "131970228692",
    appId: "1:131970228692:web:21e7b5a3bff972552f7641"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();



// on.click function for submit button
$("button").on("click", function (e) {
    e.preventDefault();
    //$("td").empty();

    var trainName = $("#train-name").val().trim();
    var destName = $("#destination-name").val().trim();
    var trainTime = $("#train-time").val().trim();
    var timeFreq = $("#time-freq").val().trim();

    var newTrain = {
        name: trainName,
        destination: destName,
        firstTrain: trainTime,
        frequency: timeFreq
    };


    // Send info to firebase
    database.ref().set(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);

    //return info to html
    database.ref().on("value", function (info) {
        
        var newTime = info.val().firstTrain;
        var newFreq = info.val().frequency;


        var firstTrainTime = moment(newTime, "hh:mm a").subtract(1, "years");
        var currentTime = moment().format("HH:mm a");
        console.log("Current Time:" + currentTime);

        var timeDiff = moment().diff(moment(firstTrainTime), "minutes");
        var timeLeft = timeDiff % newFreq;
        var minutesAway = newFreq - timeLeft;
        var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");


        // Store all table content into localStorage
        localStorage.setItem("name", trainName);
        localStorage.setItem("destination", destName);
        localStorage.setItem("frequency", timeFreq);
        localStorage.setItem("nextArrival", nextArrival);
        localStorage.setItem("minutesAway", minutesAway);


        var newTR = $("<tr>").append(
            $("<td>").text(localStorage.getItem("name")),
            $("<td>").text(localStorage.getItem("destination")),
            $("<td>").text(localStorage.getItem("frequency")),
            $("<td>").text(localStorage.getItem("nextArrival")),
            $("<td>").text(localStorage.getItem("minutesAway"))

        );
        newTR.appendTo("tbody");
    

        // Clear form
        $('#train-name').val('');
        $('#destination-name').val('');
        $('#time-freq').val('');
        $('#train-time').val('');

    })
})

newTR = $("<tr>").append(
    $("<td>").text(localStorage.getItem("name")),
    $("<td>").text(localStorage.getItem("destination")),
    $("<td>").text(localStorage.getItem("frequency")),
    $("<td>").text(localStorage.getItem("nextArrival")),
    $("<td>").text(localStorage.getItem("minutesAway"))
);
newTR.appendTo("tbody");