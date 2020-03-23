var newTR = $("<tr>");
var newTD = $("<td>");





$("button").on("click", function(e) {
    e.preventDefault();
    
    var trainName = $("#train-name").val().trim();
    newTD.text(trainName);
    newTD.appendTo(newTR);
    newTR.appendTo($("table"));
    var destName = $("#destination-name").val().trim();
    var trainTime = $("#train-time").val().trim();
    var timeFreq = $("#time-freq").val().trim();
    
})


