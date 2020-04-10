# Train-station-schedule
https://jkrayg.github.io/Train-station-schedule/

This is a train scheduler that calculates frequency, next arrival and minutes away of a specific train. The user types in the train name, destination, first train time, and frequency. All informtion gets pushed to a table. I used moment.js to calculate the next arrival and minutes away.

I started this by making the table and the form for the user to fill out. I got the values of the users input and pushed them up to the table. Then I calculated what time the next train arrival is and how many minutes away the train is using moment.js (the most challenging code I had to figure out). After getting all of the information in the table I made a firebase database to hold all of the form values. Then I returned the firebase content to the table. CSS not my worst...
