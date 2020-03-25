var firebaseConfig = {
    //
    //
    //
    //
    //
    //
    //
    //Add API key!
    apiKey: "",
    authDomain: "trainschedule-478a8.firebaseapp.com",
    databaseURL: "https://trainschedule-478a8.firebaseio.com",
    projectId: "trainschedule-478a8",
    storageBucket: "trainschedule-478a8.appspot.com",
    messagingSenderId: "131970228692",
    appId: "1:131970228692:web:21e7b5a3bff972552f7641"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();




$("button").on("click", function (e) {
    e.preventDefault();
    var tyme = new Date();

    var currentHour = tyme.getHours();
    var currentMinute = ("0" + tyme.getMinutes(currentMinute)).slice(-2);
    var currentTime = currentHour + ":" + currentMinute;
    //var nextTrain = currentTime ;

    //currentMinute = currentMinute % 15;
    //console.log(currentMinute);

    var trainName = $("#train-name").val().trim();
    var destName = $("#destination-name").val().trim();
    var timeFreq = $("#time-freq").val().trim();
    
    

    database.ref().set({
        trainName:trainName,
        destName:destName,
        timeFreq:timeFreq,
        currentTime:currentTime
    })

    database.ref().on("value", function(info){
        var newTR = $("<tr>").append(
            $("<td>").text(info.val().trainName),
            $("<td>").text(info.val().destName),
            $("<td>").text(info.val().timeFreq),
            $("<td>").text(info.val().currentTime)
        );
        newTR.appendTo("tbody");

    })

    localStorage.clear();

      // Store all content into localStorage
        localStorage.setItem("trainName", trainName);
        localStorage.setItem("destName", destName);
        localStorage.setItem("timeFreq", timeFreq);
        localStorage.setItem("currentTime", currentTime);
    })

    newTR = $("<tr>").append(
        $("<td>").text(localStorage.getItem("trainName")),
        $("<td>").text(localStorage.getItem("destName")),
        $("<td>").text(localStorage.getItem("timeFreq")),
        $("<td>").text(localStorage.getItem("currentTime"))
    );

    $('#train-name').val('');
    $('#destination-name').val('');
    $('#time-freq').val('');
    $('#train-time').val('');
