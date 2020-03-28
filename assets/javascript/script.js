// Initialize firebase
var firebaseConfig = {
    //
    //
    //
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


function update() {
    var currentTime = moment().format("hh:mm a");
    $("#current-time").html("Current Time: " + currentTime);
}
setInterval(update, 1000);



// on.click function for submit button
$("button").on("click", function (e) {
    e.preventDefault();
    //$("td").empty();

    var trainName = $("#train-name").val().trim();
    var destName = $("#destination-name").val().trim();
    var trainTime = $("#train-time").val().trim();
    var timeFreq = $("#time-freq").val().trim();

    var firstTrainTime = moment(trainTime, "hh:mm a").subtract(1, "years");
    var timeDiff = moment().diff(moment(firstTrainTime), "minutes");
    var timeLeft = timeDiff % timeFreq;
    var minutesAway = timeFreq - timeLeft;
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");


    function update() {
        minutesAway = timeFreq - timeLeft;
    }
    setInterval(update, 1000);


    var newTrain = {
        name: trainName,
        destination: destName,
        firstTrain: trainTime,
        frequency: timeFreq,
        nextArrival: nextArrival,
        minutesAway: minutesAway
    };


    // Send info to firebase
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
    console.log(newTrain.nextArrival);
    console.log(newTrain.minutesAway);


    $('#train-name').val('');
    $('#destination-name').val('');
    $('#time-freq').val('');
    $('#train-time').val('');
})


//return info to html
database.ref().on("child_added", function (info) {
    var newName = info.val().name;
    var newDest = info.val().destination;
    var newFreq = info.val().frequency;
    var nextArr = info.val().nextArrival;
    var minAway = info.val().minutesAway;


    var newRow = $("<tr>").append(
        $("<td>").text(newName),
        $("<td>").text(newDest),
        $("<td>").text(newFreq),
        $("<td>").text(nextArr),
        $("<td>").text(minAway)
    );
    $(".table > tbody").append(newRow);

})